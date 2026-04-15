'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'

// First 4 strongest editorial images BEFORE the text block
const editorialImagesBefore = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Editorial_28-Wm47vKHouboCZAdtYl1uJUyNCjXEhd.jpg',
    alt: 'Model with puppet strings and colorful layered vest',
    from: 'left',
    offsetX: '5%',
    width: 'w-[75%] md:w-[42%]',
    aspect: 'aspect-[2/3]',
    marginBottom: 'mb-16',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Editorial_14-USAxdSCRHMUr25TsjY3mG1lswT96jk.jpg',
    alt: 'Seated model with star collar and brocade gown',
    from: 'right',
    offsetX: '8%',
    width: 'w-[70%] md:w-[38%]',
    aspect: 'aspect-[2/3]',
    marginBottom: 'mb-24',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Editorial_06-ZoLWXp5zcncWvF2sBmO17NL8JIxl8n.jpg',
    alt: 'Overhead view of model reclined on patterned floor',
    from: 'left',
    offsetX: '0%',
    width: 'w-[88%] md:w-[55%]',
    aspect: 'aspect-[3/2]',
    marginBottom: 'mb-20',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Editorial_38-G5rZV83cOcwbZWEfzKa0PswptXWEEO.jpg',
    alt: 'Two models in kitchen scene',
    from: 'right',
    offsetX: '12%',
    width: 'w-[72%] md:w-[44%]',
    aspect: 'aspect-[2/3]',
    marginBottom: 'mb-12',
  },
]

// Remaining editorial images AFTER the text block
const editorialImagesAfter = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Editorial_33-Sq8nyhm0Y4aBgZ7VcJxwZMvpTAjCTU.jpg',
    alt: 'Model seated in checkered outfit with puppet string',
    from: 'left',
    offsetX: '10%',
    width: 'w-[65%] md:w-[36%]',
    aspect: 'aspect-[2/3]',
    marginBottom: 'mb-20',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Editorial_27-chlqhAdAsvMoOzXUZOhM77jRTGq1ZY.jpg',
    alt: 'Model with puffy sleeve blouse and floral skirt',
    from: 'right',
    offsetX: '6%',
    width: 'w-[68%] md:w-[40%]',
    aspect: 'aspect-[2/3]',
    marginBottom: 'mb-28',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Editorial_35-7E2MRMsF40I6Q7FIYcSxqHw5ioqxON.jpg',
    alt: 'Two models in checkered outfits on daybed',
    from: 'left',
    offsetX: '0%',
    width: 'w-[78%] md:w-[48%]',
    aspect: 'aspect-[2/3]',
    marginBottom: 'mb-18',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Editorial_02-FO30gUT6uwU222bsEbLYRwgqZSjmjb.jpg',
    alt: 'Seated model in red hand-knit sweater',
    from: 'right',
    offsetX: '15%',
    width: 'w-[62%] md:w-[35%]',
    aspect: 'aspect-[2/3]',
    marginBottom: 'mb-24',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Editorial_22-FmbV1UwqHCw1MSAPvCJe5rQiJ5b2Io.jpg',
    alt: 'Library scene with floral jacket and red tiered skirt',
    from: 'left',
    offsetX: '0%',
    width: 'w-[90%] md:w-[58%]',
    aspect: 'aspect-[3/2]',
    marginBottom: 'mb-20',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Editorial_17-rmsGNl6Ona8KyCMY56s41CFepdj0El.jpg',
    alt: 'Model in tweed jacket with burgundy pants',
    from: 'right',
    offsetX: '10%',
    width: 'w-[66%] md:w-[38%]',
    aspect: 'aspect-[2/3]',
    marginBottom: 'mb-26',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Editorial_19-Delehd6usN5SYVBg679Yz4zbW3rdli.jpg',
    alt: 'Low angle of model in tweed jacket',
    from: 'left',
    offsetX: '5%',
    width: 'w-[82%] md:w-[52%]',
    aspect: 'aspect-[3/2]',
    marginBottom: 'mb-22',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Editorial_25-WYZR0p5tHl51cag4r9mSV7xmM6udDZ.jpg',
    alt: 'Seated model in teal fur coat',
    from: 'right',
    offsetX: '18%',
    width: 'w-[58%] md:w-[32%]',
    aspect: 'aspect-[2/3]',
    marginBottom: 'mb-16',
  },
]

// Lookbook images
const lookbookImages = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Lookbook_01-ebuNAn3CMp3Z7jZIxp8VF7wgqKQrHy.jpg',
    alt: 'Lookbook 01',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Lookbook_05-FxGew7UAG3gURxtkkjAX9lxbIERSMx.jpg',
    alt: 'Lookbook 05',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Lookbook_12-JzkibWIRkN3VZuytFBqBorFk37ETIH.jpg',
    alt: 'Lookbook 12',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Lookbook_13-YLVhdPECzvHs1KODP7FiJaDAlcJca3.jpg',
    alt: 'Lookbook 13',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Lookbook_16-7fbHEeaCFsj6WtdL1ZMwJOzA6Pahaz.jpg',
    alt: 'Lookbook 16',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Lookbook_19-3UUZlSvk3gyw9r9n70Kwf8UBhDh7er.jpg',
    alt: 'Lookbook 19',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Lookbook_22-smOaNby3M2wE6TzOPqtyGhwih7rlbI.jpg',
    alt: 'Lookbook 22',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TFEModa2425_Mariona_Ramos_Lookbook_26-Z3gxDbM4OGhCIbf2VQCkvrN0hb4mXR.jpg',
    alt: 'Lookbook 26',
  },
]

interface EditorialImageProps {
  src: string
  alt: string
  from: 'left' | 'right'
  offsetX: string
  width: string
  aspect: string
  marginBottom: string
}

function EditorialImage({ src, alt, from, offsetX, width, aspect, marginBottom }: EditorialImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hasRevealed, setHasRevealed] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const lastScrollY = useRef(0)
  const scrollDirection = useRef<'down' | 'up'>('down')

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      scrollDirection.current = currentScrollY > lastScrollY.current ? 'down' : 'up'
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
          
          // Mark as revealed when it enters viewport while scrolling down
          if (entry.isIntersecting && scrollDirection.current === 'down') {
            setHasRevealed(true)
          }
          
          // Reset revealed state when scrolling up and element leaves viewport
          if (!entry.isIntersecting && scrollDirection.current === 'up' && hasRevealed) {
            setHasRevealed(false)
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '-5% 0px -5% 0px',
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [hasRevealed])

  // Calculate the horizontal translation for enter/exit
  const translateX = from === 'left' ? '-120px' : '120px'

  // Position styles based on direction
  const positionStyle = from === 'left'
    ? { marginLeft: offsetX, marginRight: 'auto' }
    : { marginRight: offsetX, marginLeft: 'auto' }

  // Determine visibility state:
  // - Show (in final position) when: revealed AND in view
  // - Hide (off to side) when: not revealed OR (revealed but scrolled out of view going up)
  const shouldShow = hasRevealed && isInView

  return (
    <div
      ref={ref}
      className={`${width} ${marginBottom}`}
      style={{
        ...positionStyle,
        opacity: shouldShow ? 1 : 0,
        transform: shouldShow ? 'translateX(0)' : `translateX(${translateX})`,
        transition: 'opacity 0.9s cubic-bezier(0.23, 1, 0.32, 1), transform 0.9s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      <div className={`relative ${aspect} overflow-hidden`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 85vw, 55vw"
        />
      </div>
    </div>
  )
}

function LookbookImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative flex-1 min-w-0 aspect-[3/4] overflow-hidden transition-all duration-500 ease-out hover:flex-[1.3]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 12.5vw"
      />
    </div>
  )
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="px-6 md:px-12 pt-28 pb-12"
      aria-labelledby="projects-heading"
    >
      <div className="flex items-baseline justify-between mb-20 md:mb-28">
        <h2
          id="projects-heading"
          className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground"
        >
          Projects
        </h2>
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50">
          Selected Work
        </span>
      </div>

      {/* First 4 strongest editorial images */}
      <div className="flex flex-col">
        {editorialImagesBefore.map((img) => (
          <EditorialImage key={img.src} {...img} from={img.from as 'left' | 'right'} />
        ))}
      </div>

      {/* Collection text block */}
      <div className="flex flex-col items-center text-center py-20 md:py-32 px-4 md:px-16 lg:px-32 max-w-4xl mx-auto">
        <h3 className="font-logo text-3xl md:text-4xl text-foreground mb-10 text-balance leading-tight">
          Puppet Riot FW25
        </h3>
        <p className="font-sans text-[13px] tracking-[0.02em] text-muted-foreground leading-[1.8] max-w-2xl text-balance">
          Puppet Riot is a celebration of self-expression, theatricality, and rebellion. Inspired by the Blitz Kids of 1980s London, the collection reinterprets their irreverent and maximalist spirit through the symbolism of puppets, exploring the delicate balance between control and freedom. The Tiller Clowes puppets, with their rigid and nostalgic aesthetic, become a metaphor for the identity play and performance that defined this subculture. Like the Blitz Kids, the puppets come to life when they take the stage, becoming protagonists of their own narrative, transforming the inanimate into something vibrant and provocative. The collection uses repurposed and vintage fabrics, from upholstery and curtains to other domestic textiles, giving new life to materials loaded with history and character. More than a collection, Puppet Riot is a visual manifesto: an ode to excess, artifice, and transformation, where each look is a mask, a costume, and a declaration of intent.
        </p>
      </div>

      {/* Remaining editorial images after text block */}
      <div className="flex flex-col">
        {editorialImagesAfter.map((img) => (
          <EditorialImage key={img.src} {...img} from={img.from as 'left' | 'right'} />
        ))}
      </div>

      {/* Lookbook section */}
      <div className="mt-32">
        <h3 className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-12 text-center">
          Lookbook
        </h3>
        <div className="flex w-full">
          {lookbookImages.map((img) => (
            <LookbookImage key={img.src} {...img} />
          ))}
        </div>
      </div>
    </section>
  )
}
