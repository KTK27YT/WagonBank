import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import React from "react"

export default function Footnotes() {
    return (
        <div className="h-[5rem] rounded-md bg-black flex flex-col items-center justify-center relative w-full">
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Footnotes</AccordionTrigger>
                    <AccordionContent>
                        * Only our partner banks have FDIC insurance, wagonbank is just a tech company
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>

    );
};