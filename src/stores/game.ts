import { writable, derived } from 'svelte/store';
import relics from '@app/relics.yaml'
import type { Rarity } from '@app/sts';
import type { Relic } from '@app/types';

type RelicYaml = {
  id: string
  name: string
  flavor: string
  description: string
  rarity_key: string
  mtg: string
  mtg_rules: string
  mtg_why: string
}
type RelicsYaml = Record<string, RelicYaml>
type Relics = Record<string, Relic>

interface GameState {
  relics: Relics
  selectedRelicId: null | string
  activeRelicIds: string[],
  selectedRarity: null | Rarity
  isShowingAll: boolean
  searchTerm: string
  isWelcomeNoticeVisible: boolean
  isCollapsed: boolean
  // timer: null | number // Date.now()
}

const mapRelicYaml = (relicYaml: RelicsYaml): Relics => {
  const relics: Relics = {}
  for (const relicName in relicYaml) {
    const relicData = relicYaml[relicName]
    const id = relicData.id.toLowerCase()

    relics[id] = {
      id: id,
      name: relicData.name,
      desc: relicData.mtg,
      original: relicData.description,
      rarity: relicData.rarity_key as Rarity,
      rules: relicData.mtg_rules,
      why: relicData.mtg_why
    }
  }
  return relics
}

const initialState: GameState = {
  relics: mapRelicYaml(relics as RelicsYaml),
  selectedRelicId: null,
  activeRelicIds: [],
  selectedRarity: null,
  isShowingAll: false,
  searchTerm: '',
  isWelcomeNoticeVisible: true,
  isCollapsed: false
  // timer: null
};

const browser = typeof window !== 'undefined'

function createStore() {
  const stored =
    browser
      ? localStorage.getItem('my-store')
      : null

  const { subscribe, update, set } = writable<GameState>(
    stored
      ? { ...initialState, ...JSON.parse(stored) }
      : initialState,
  )

  subscribe((value) => {
    if (!browser) return

    const { relics, ...persisted } = value

    localStorage.setItem(
      'my-store',
      JSON.stringify(persisted),
    )
  })

  return {
    subscribe, // required
    selectRelicId: (relicId: string) => update(s => ({ ...s, selectedRelicId: relicId })),
    unselectRelicId: () => update(s => ({ ...s, selectedRelicId: null })),
    clear: () => update(s => ({ ...s, activeRelicIds: [] })),
    enableRelicId: (relicId: string) => update(s => ({ ...s, activeRelicIds: s.activeRelicIds.concat([relicId]) })),
    unenableRelicId: (relicId: string) => update(s => ({ ...s, activeRelicIds: s.activeRelicIds.filter(id => id !== relicId) })),
    selectRarity: (rarity: Rarity) => update(s => ({ ...s, selectedRarity: rarity })),
    unselectRarity: () => update(s => ({ ...s, selectedRarity: null })),
    toggleShowAll: () => update(s => ({ ...s, isShowingAll: !s.isShowingAll })),
    updateSearchTerm: (term: string) => update(s => ({ ...s, searchTerm: term })),
    hideWelcomeNotice: () => update(s => ({ ...s, isWelcomeNoticeVisible: false })),
    toggleCollapsed: () => update(s => ({ ...s, isCollapsed: !s.isCollapsed }))
  };
}

export const store = createStore();

export const selectRelicById = (relicId: string) => {
  return derived(store, $s => $s.relics[relicId]);
}

export const selectSelectedRelicId = () => {
  return derived(store, $s => $s.selectedRelicId);
}

export const selectSelectedRarity = () => {
  return derived(store, $s => $s.selectedRarity);
}

export const selectIsShowingAll = () => {
  return derived(store, $s => $s.isShowingAll);
}
export const selectSearchTerm = () => {
  return derived(store, $s => $s.searchTerm);
}

export const selectSelectedRelic = () => {
  return derived(store, $s => {
    var id = $s.selectedRelicId;
    if (id !== null) return $s.relics[id];
    else return null;
  });
}

export const selectActiveRelicIds = () => {
  return derived(store, $s => $s.activeRelicIds);
}

export const selectIsWelcomeNoticeVisible = () => {
  return derived(store, $s => $s.isWelcomeNoticeVisible);
}