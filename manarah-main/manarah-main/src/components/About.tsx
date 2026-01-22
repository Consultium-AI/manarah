import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className="container-max mt-20">
      <div className="px-2 sm:px-0 text-center">
        {/* Pretitle */}
        <Reveal>
          <p className="tracking-[0.35em] text-xs sm:text-sm font-semibold text-blue-600 mb-6 uppercase">
            Solidariteit · Naastenliefde · Betrokkenheid
          </p>
        </Reveal>

        {/* Title with highlighted span */}
        <Reveal delay={0.1}>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
            <span className="inline-block bg-sky-200/80 text-blue-800 px-3 py-2 rounded-md mr-2">Wie zijn wij</span>
            als stichting
          </h2>
        </Reveal>

        {/* Body copy */}
        <Reveal delay={0.2}>
          <div className="max-w-4xl mx-auto text-gray-800 text-lg sm:text-2xl leading-relaxed space-y-6 text-center">
            <p>
            Stichting Manarah is een onafhankelijke, non-profit liefdadigheidsorganisatie gevestigd in Nederland. Wij zetten ons in voor het ondersteunen van kwetsbare mensen: armen, wezen en mensen met een beperking – zowel binnen Nederland als in noodlijdende gemeenschappen wereldwijd.

            </p>
            <p>Er zijn mensen die wachten op een warme maaltijd, een beetje aandacht of een liefdevol woord. Met jouw steun kunnen wij hen hoop bieden, hun pijn verzachten en een glimlach terugbrengen op gezichten die gebukt gaan onder armoede.

            </p>
            <p>
              Samen kunnen we levens veranderen.
            </p>
            <strong>
              <br/>
              Wees een bron van licht. Een reden voor hoop. En een verschil in het leven van een ander.
              </strong>

          </div>
        </Reveal>
      </div>
    </section>
  );
}


