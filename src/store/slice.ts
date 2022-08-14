import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  items: Record<string, TMachine[]>;
  types: TMachinesType[];
}

const initialState: AppState = {
  items: {},
  types: [],
};

export const appSlice = createSlice({
  name: "machines",
  initialState,
  reducers: {
    addType: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.types.push({
        id: payload.id,
        fields: [],
      });
      state.items[payload.id] = [];
    },
    removeType: (state, { payload }: PayloadAction<string>) => {
      state.types = state.types.filter((type) => type.id !== payload);
      state.items[payload] = [];
    },
    addField: (
      state,
      {
        payload,
      }: PayloadAction<{
        machineTypeId: string;
        fieldId: string;
        type: TSupportedType;
      }>,
    ) => {
      state.types
        .find((type) => type.id === payload.machineTypeId)
        ?.fields?.push({
          id: payload.fieldId,
          type: payload.type,
        });
    },
    removeField: (
      state,
      { payload }: PayloadAction<{ machineTypeId: string; fieldId: string }>,
    ) => {
      const machineType = state.types.find(
        (type) => type.id === payload.machineTypeId,
      );
      if (machineType) {
        machineType.fields = machineType.fields?.filter(
          (field) => field.id !== payload.fieldId,
        );
        if (machineType.titleField === payload.fieldId) {
          machineType.titleField = machineType.fields?.[0].id;
        }
      }
    },
    changeField: (
      state,
      {
        payload,
      }: PayloadAction<{
        machineTypeId: string;
        fieldId: string;
        name?: string;
        type?: TSupportedType;
      }>,
    ) => {
      const field = state.types
        .find((type) => type.id === payload.machineTypeId)
        ?.fields?.find((field) => field.id === payload.fieldId);

      if (field) {
        field.name = payload.name ?? field.name;
        field.type = payload.type ?? field.type;
      }
    },
    changeType: (
      state,
      {
        payload,
      }: PayloadAction<{
        machineTypeId: string;
        titleFieldId?: string;
        name?: string;
      }>,
    ) => {
      const machineType = state.types.find(
        (type) => type.id === payload.machineTypeId,
      );
      if (machineType) {
        machineType.titleField = payload.titleFieldId ?? machineType.titleField;
        machineType.name = payload.name ?? machineType.name;
      }
    },
    /**
     * machines
     */
    addMachine: (
      state,
      { payload }: PayloadAction<{ id: string; machineTypeId: string }>,
    ) => {
      state.items[payload.machineTypeId].push({
        id: payload.id,
        machineTypeId: payload.machineTypeId,
        fields: {},
      });
    },
    removeMachine: (
      state,
      { payload }: PayloadAction<{ id: string; machineTypeId: string }>,
    ) => {
      state.items[payload.machineTypeId] = state.items[
        payload.machineTypeId
      ]?.filter((item) => item.id !== payload.id);
    },
    changeMachineField: (
      state,
      {
        payload,
      }: PayloadAction<{
        machineId: string;
        fieldId: string;
        machineTypeId: string;
        value: string | boolean;
      }>,
    ) => {
      const machineField = state.items[payload.machineTypeId].find(
        (item) => item.id === payload.machineId,
      )?.fields;

      if (machineField) {
        machineField[payload.fieldId] = payload.value;
      }
    },
  },
});

export const {
  addType,
  removeType,
  addField,
  removeField,
  changeField,
  changeType,
  // machines
  addMachine,
  removeMachine,
  changeMachineField,
} = appSlice.actions;

export default appSlice.reducer;
