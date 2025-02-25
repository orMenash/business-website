
import { useBusiness } from "@/contexts/BusinessContext";
import { useToast } from "@/components/ui/use-toast";
import formConfig from "@/config/contact-form.json";

export const ContactForm = () => {
  const { contact } = useBusiness();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    
    // Reset form immediately for better UX
    form.reset();

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${formConfig.email || contact.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // Include form fields
          ...(Object.fromEntries(formData)),
          // Add _replyto field with user's email
          _replyto: email,
          // Include all options from config
          ...formConfig.options
        }),
      });

      const result = await response.json();

      if (result.success === "true") {
        toast({
          title: "ההודעה נשלחה בהצלחה",
          description: "נחזור אליך בהקדם",
        });
      } else {
        if (result.message?.includes("needs Activation")) {
          throw new Error("הטופס עדיין לא הופעל. אנא פנה למנהל האתר");
        }
        throw new Error(result.message || "שגיאה בשליחת הטופס");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "שגיאה בשליחת הטופס",
        description: error instanceof Error ? error.message : "אנא נסה שוב מאוחר יותר",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
    >
      <div className="space-y-4">
        {Object.entries(formConfig.fields).map(([fieldName, field]) => (
          <div key={fieldName}>
            <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700 mb-1">
              {field.placeholder}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={fieldName}
                name={fieldName}
                required={field.required}
                placeholder={field.placeholder}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            ) : (
              <input
                type={field.type}
                id={fieldName}
                name={fieldName}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-accent/90 transition-colors"
        >
          שלח הודעה
        </button>
      </div>
    </form>
  );
};
