export default function ContactSection() {
  return (
    <section id="contact" className="mb-12">
      <h2 className="text-[13px] max-sm:text-[12px] font-medium text-[#86868b] uppercase tracking-[0.04em] mb-6">
        Contact
      </h2>
      <p className="text-[15px] text-[#86868b] leading-[1.6]">
        always happy to chat —{' '}
        <a
          href="mailto:sy3544@nyu.edu"
          className="text-[#1d1d1f] font-medium underline underline-offset-[3px] decoration-[#d2d2d7] hover:decoration-[#1d1d1f] transition-colors duration-200"
        >
          sy3544@nyu.edu
        </a>
      </p>
    </section>
  );
}
