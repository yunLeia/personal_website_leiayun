export default function ContactSection() {
  return (
    <section id="contact" className="mb-12">
      <h2 className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-6">
        Contact
      </h2>
      <div className="bg-white/15 backdrop-blur-[16px] border border-white/30 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)] rounded-xl px-6 py-5">
        <p className="text-[15px] font-normal text-[#444] leading-[1.6]">
          always happy to chat —{' '}
          <a
            href="mailto:sy3544@nyu.edu"
            className="text-[#111] font-medium underline underline-offset-[3px] decoration-[#d2d2d7] hover:decoration-[#111] transition-colors duration-200"
          >
            sy3544@nyu.edu
          </a>
        </p>
      </div>
    </section>
  );
}
