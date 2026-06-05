export type NavItem = {
  label: string
  href: string
  children?: NavItem[]
}

export const mainNav: NavItem[] = [
  {
    label: 'O Movimento',
    href: '/o-movimento',
    children: [
      { label: 'História', href: '/o-movimento/historia' },
      { label: 'Governança', href: '/o-movimento/governanca' },
      { label: 'Manifesto', href: '/o-movimento/manifesto' },
    ],
  },
  { label: 'Projetos', href: '/projetos' },
  { label: 'Impacto', href: '/impacto' },
  { label: 'Parceiros', href: '/parceiros' },
  { label: 'Transparência', href: '/transparencia' },
  { label: 'Notícias', href: '/noticias' },
]

export const footerNav = {
  movimento: [
    { label: 'História', href: '/o-movimento/historia' },
    { label: 'Missão e Valores', href: '/o-movimento' },
    { label: 'Governança', href: '/o-movimento/governanca' },
    { label: 'Manifesto', href: '/o-movimento/manifesto' },
  ],
  atuacao: [
    { label: 'Projetos', href: '/projetos' },
    { label: 'Impacto', href: '/impacto' },
    { label: 'Parceiros', href: '/parceiros' },
    { label: 'Transparência', href: '/transparencia' },
  ],
  participe: [
    { label: 'Seja membro', href: '/participar' },
    { label: 'Seja parceiro', href: '/participar/parceiro' },
    { label: 'Notícias', href: '/noticias' },
    { label: 'Contato', href: '/contato' },
  ],
  legal: [
    { label: 'Privacidade', href: '/privacidade' },
    { label: 'Termos de uso', href: '/termos' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'Acessibilidade', href: '/acessibilidade' },
  ],
}
