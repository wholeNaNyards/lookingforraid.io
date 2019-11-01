const feedReducer = (state, action) => {
  switch (action.type) {
    case 'selectRegion':
      return { ...state, selectedRegion: action.value, selectedRealm: 'any' };
    case 'selectRealm':
      return { ...state, selectedRealm: action.value };
    case 'selectFaction':
      return { ...state, selectedFaction: action.value };
    case 'selectClassOptions':
      return { ...state, selectedClassOptions: action.value };
    case 'selectClasses':
      return { ...state, selectedClasses: action.value };
    case 'selectILvl':
      return { ...state, selectedILvl: action.value };
    case 'selectProgressionOptions':
      return { ...state, selectedProgressionOptions: action.value };
    case 'selectProgressionTEPM':
      return { ...state, selectedProgressionTEPM: action.value };
    case 'selectProgressionTEPH':
      return { ...state, selectedProgressionTEPH: action.value };
    case 'selectProgressionBoDM':
      return { ...state, selectedProgressionBoDM: action.value };
    case 'selectProgressionBoDH':
      return { ...state, selectedProgressionBoDH: action.value };
    default:
      return state;
  }
};

export default feedReducer;
