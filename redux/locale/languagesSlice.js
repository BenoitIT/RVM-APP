import { createSlice } from "@reduxjs/toolkit";
import { I18n } from "i18n-js";
import translations from "../../components/contents/locale/translation";
const i18n = new I18n(translations);
const initialState = {
  activeLanguage: 1,
  locale: i18n.locale,
};

export const LanguageSlice = createSlice({
  name: "currentLanguage",
  initialState,
  reducers: {
    setCurrentLanguage: (state, action) => {
      return {
        ...state,
        locale: action.payload,
      };
    },
    setActiveLanguage: (state, action) => {
      return {
        ...state,
        activeLanguage: action.payload,
      };
    },
  },
});

export const { setCurrentLanguage, setActiveLanguage } = LanguageSlice.actions;

export const showActiveLanguage = (state) =>
  state.currentLanguage.activeLanguage;

export default LanguageSlice.reducer;
