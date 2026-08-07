'use client';
import { motion } from 'framer-motion';
export function PageHero({eyebrow,title,children}:{eyebrow:string;title:string;children?:React.ReactNode}) {return <section className="mx-auto max-w-6xl px-5 pb-8 pt-28 text-center md:pt-36"><motion.p initial={{opacity:0}} animate={{opacity:1}} className="eyebrow">{eyebrow}</motion.p><h1 className="title mx-auto mt-4 max-w-3xl text-5xl leading-[.98] md:text-7xl">{title}</h1>{children&&<div className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/55">{children}</div>}</section>}
