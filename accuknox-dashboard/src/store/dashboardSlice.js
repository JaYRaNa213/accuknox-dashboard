import { createSlice } from "@reduxjs/toolkit";
import initialData from "../data/initialData.json";

const initialState = {
  categories: initialData.categories || [],
  widgets: initialData.widgets || []
};

const findCategory = (state, categoryId) =>
  state.categories.find((c) => c.id === categoryId);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    createWidget: {
      reducer(state, action) {
        const { widget, categoryId } = action.payload;
        // add to widget list if not present
        const exists = state.widgets.find((w) => w.id === widget.id);
        if (!exists) state.widgets.push(widget);
        // add to category
        const cat = findCategory(state, categoryId);
        if (cat && !cat.widgetIds.includes(widget.id)) {
          cat.widgetIds.push(widget.id);
        }
      },
      prepare({ name, text, categoryId }) {
        const id = "w-" + Date.now().toString();
        return { payload: { widget: { id, name, text }, categoryId } };
      }
    },
    toggleWidgetInCategory(state, action) {
      const { categoryId, widgetId } = action.payload;
      const cat = findCategory(state, categoryId);
      if (!cat) return;
      const idx = cat.widgetIds.indexOf(widgetId);
      if (idx === -1) {
        cat.widgetIds.push(widgetId);
      } else {
        cat.widgetIds.splice(idx, 1);
      }
    },
    removeWidgetFromCategory(state, action) {
      const { categoryId, widgetId } = action.payload;
      const cat = findCategory(state, categoryId);
      if (!cat) return;
      cat.widgetIds = cat.widgetIds.filter((id) => id !== widgetId);
    },
    addCategory(state, action) {
      const { id, name } = action.payload;
      const exists = state.categories.find((c) => c.id === id);
      if (!exists) state.categories.push({ id, name, widgetIds: [] });
    }
  }
});

export const {
  createWidget,
  toggleWidgetInCategory,
  removeWidgetFromCategory,
  addCategory
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
