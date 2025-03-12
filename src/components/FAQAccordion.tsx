
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ } from "@/contexts/BusinessContext";

type FAQAccordionProps = {
  items: FAQ[];
};

export const FAQAccordion = ({ items }: FAQAccordionProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full">
        {items.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-right font-medium text-lg">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
              <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
