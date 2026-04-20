const SYMBOL_MAP: Record<string, string> = {
  // Generic / colorless
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
  '10': '10', '11': '11', '12': '12', '13': '13', '14': '14',
  '15': '15', '16': '16', '17': '17', '18': '18', '19': '19',
  '20': '20', '100': '100', '1000000': '1000000',
  'X': 'x', 'Y': 'y', 'Z': 'z',
  'C': 'c',      // Colorless (diamond)
  'S': 's',      // Snow

  // Colors
  'W': 'w', 'U': 'u', 'B': 'b', 'R': 'r', 'G': 'g',

  // Phyrexian
  'W/P': 'wp', 'U/P': 'up', 'B/P': 'bp', 'R/P': 'rp', 'G/P': 'gp',
  'P': 'p',

  // Hybrid (two-color)
  'W/U': 'wu', 'W/B': 'wb', 'U/B': 'ub', 'U/R': 'ur',
  'B/R': 'br', 'B/G': 'bg', 'R/G': 'rg', 'R/W': 'rw',
  'G/W': 'gw', 'G/U': 'gu',

  // Hybrid generic (2/Color)
  '2/W': '2w', '2/U': '2u', '2/B': '2b', '2/R': '2r', '2/G': '2g',

  // Tap / Untap
  'T': 'tap', 'Q': 'untap',

  // Energy / Acorn / other symbols
  'E': 'e',
  'TK': 'ticket', // Ticket (from Unfinity)
  'A': 'acorn',   // Acorn

  // Half mana (silver-bordered/acorn)
  'HW': 'hw', 'HR': 'hr',

  // Chaos (planechase)
  'CHAOS': 'chaos',
};

function symbolToClass(raw: string): string {
  const key = raw.toUpperCase();
  const msClass = SYMBOL_MAP[key];
  if (msClass) return msClass;
  return raw.toLowerCase();
}

function symbolToHtml(raw: string): string {
  const cls = symbolToClass(raw);
  return `<i class="ms ms-${cls} ms-cost"></i>`;
}

export function mtgify(str: string): string {
  if (!str) return ""
  return str.replace(/\{([^}]+)\}/g, (_, inner) => symbolToHtml(inner)).replaceAll('\n', '<br />')
}