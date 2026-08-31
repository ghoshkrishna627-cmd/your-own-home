const Footer = () => {
  const year = new Date().getFullYear();

  const columns = [
    {
      title: 'About',
      links: [
        { label: 'How it works', href: '/about' },
        { label: 'Newsroom', href: '/about/newsroom' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/support' },
        { label: 'Contact us', href: '/contact' },
        { label: 'Trust & Safety', href: '/support/safety' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Service', href: '/legal/terms' },
        { label: 'Privacy Policy', href: '/legal/privacy' },
      ],
    },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="font-semibold mb-3 text-sm">{col.title}</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-semibold mb-3 text-sm">Follow us</h3>
          <div className="flex gap-3 text-sm text-slate-500 dark:text-slate-400">
            <a href="#" aria-label="Instagram" className="hover:underline">
              Instagram
            </a>
            <a href="#" aria-label="X" className="hover:underline">
              X
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 py-4 text-center text-xs text-slate-400">
        © {year} Your Own Home. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
