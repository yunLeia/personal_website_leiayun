export default function ContactSection() {
  return (
    <footer id="contact" className="mt-24 max-sm:mt-16 mb-8 pt-10 max-sm:pt-8 border-t border-black/5">
      <p className="text-[16px] max-sm:text-[14px] font-normal text-[#999] leading-[1.6]">
        always happy to chat —{' '}
        <a
          href="mailto:sy3544@nyu.edu"
          className="text-[#444] font-medium no-underline hover:text-[#111] transition-colors duration-200"
        >
          sy3544@nyu.edu
        </a>
      </p>
    </footer>
  );
}
