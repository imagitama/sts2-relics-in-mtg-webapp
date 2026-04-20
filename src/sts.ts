export const removeStsTags = (text: string): string => text.replace(/\[\/?[^\]]+\]/g, '');

export const stsDescToHtml = (text: string): string => {
  return text
    .replace(/\[energy:(\d+)\]/g, '<span class="inline-flex items-center gap-1 font-medium">$1 energy</span>')
    .replace(/\[gold\](.*?)\[\/gold\]/g, '<span class="text-yellow-400">$1</span>')
    .replace(/\[blue\](.*?)\[\/blue\]/g, '<span class="text-blue-400">$1</span>')
    .replace(/\[red\](.*?)\[\/red\]/g, '<span class="text-red-400">$1</span>')
    .replace(/\[green\](.*?)\[\/green\]/g, '<span class="text-green-400">$1</span>')
    .replace(/\[purple\](.*?)\[\/purple\]/g, '<span class="text-purple-400">$1</span>');
};

export enum Rarity {
  Starter = 'Starter',
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  Shop = 'Shop',
  Event = 'Event',
  Ancient = 'Ancient'
}