import { createSlice } from "@reduxjs/toolkit";
import initialData from "../data/initialData.json";

const deepCopy = (v) => JSON.parse(JSON.stringify(v));

const slice = createSlice({
  name: "dashboard",
  initialState: deepCopy(initialData),
  reducers: {
    createWidget: {
      reducer(state, action) {
        const { widget, categoryId } = action.payload;
        state.widgets.push(widget);
        const cat = state.categories.find((c) => c.id === categoryId);
        if (cat && !cat.widgetIds.includes(widget.id)) {
          cat.widgetIds.push(widget.id);
        }
      },
      prepare({ name, text, categoryId }) {
        const id = "w-" + Date.now();
        return {
          payload: { widget: { id, name, text }, categoryId }
        };
      }
    },
    addWidgetToCategory(state, action) {
      const { widgetId, categoryId } = action.payload;
      const cat = state.categories.find((c) => c.id === categoryId);
      if (!cat) return;
      if (!cat.widgetIds.includes(widgetId)) cat.widgetIds.push(widgetId);
    },
    removeWidgetFromCategory(state, action) {
      const { widgetId, categoryId } = action.payload;
      const cat = state.categories.find((c) => c.id === categoryId);
      if (!cat) return;
      cat.widgetIds = cat.widgetIds.filter((id) => id !== widgetId);
    },
    setWidgetsForCategory(state, action) {
      const { categoryId, widgetIds } = action.payload;
      const cat = state.categories.find((c) => c.id === categoryId);
      if (!cat) return;
      cat.widgetIds = widgetIds.slice();
    },
    resetDashboard(state, action) {
      const copy = deepCopy(initialData);
      state.categories = copy.categories;
      state.widgets = copy.widgets;
    }
  }
});

export const {
  createWidget,
  addWidgetToCategory,
  removeWidgetFromCategory,
  setWidgetsForCategory,
  resetDashboard
} = slice.actions;

export default slice.reducer;
