import { rules } from '@/constants/content'; import { PageHero } from '@/components/page/page-hero'; import { Accordion } from '@/components/page/accordion';
export default function Rules(){return <><PageHero eyebrow="The code of our Society" title="Honor, quiet strength, and good company.">Our rules protect the atmosphere we have chosen to build together.</PageHero><Accordion items={rules}/></>}
