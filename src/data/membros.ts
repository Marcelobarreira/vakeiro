export interface Membro {
  login: string;
  name: string;
  description: string;
}

export const MEMBROS: Membro[] = [
  {
    login: 'gabefrasson_',
    name: 'GabeFrasson',
    description:
      'Membro do Conselho Restrito. Detém o segredo do timing perfeito para entrar nas transmissões.',
  },
  {
    login: 'calabreso_sigma',
    name: 'Calabreso Sigma',
    description:
      'Estratego institucional. Sustenta o chat em momentos de baixa concentração estatística.',
  },
  {
    login: 'joaorosa',
    name: 'João Rosa',
    description:
      'Veterano silencioso. Presença confirmada em transmissões críticas. Reservado por princípio.',
  },
];
