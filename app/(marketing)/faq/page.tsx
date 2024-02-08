import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function TokenomicsPage() {
  return (
    <section className='max-w-3xl mx-auto'>
      <h2 className='text-3xl font-bold mb-4 text-yellow-400'>FAQ</h2>

      <h2 className='text-lg font-bold mb-4 mt-8 text-yellow-400'>Airdrop 1</h2>

      <Accordion type='multiple' className='w-full'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            What chain will the token be released on?
          </AccordionTrigger>
          <AccordionContent>
            The token will be released on Base.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>How can I start earning $COINS?</AccordionTrigger>
          <AccordionContent>
            $COINS can only be earned by playing gaming frames on Farcaster. The
            more you play, the more you earn. New games will be released
            regularly in the /arcade channel.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>When is the first Airdrop?</AccordionTrigger>
          <AccordionContent>
            The first airdrop will be at the end of February 2024 or early March
            2024.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
