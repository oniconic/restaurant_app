import * as actionTypes from "./booking-types";

export const addToBook = (form: any) => {
  console.log(form);
  return {
    type: actionTypes.ADD_TO_BOOK,
    payload: {
      id: form.id,
      slot: form.slot,
      time: form.time,
      remark: form.remark,
      code: new Date(),
    },
  };
};

export const removeFromBook = (code: any) => {
  return {
    type: actionTypes.REMOVE_FROM_BOOK,
    payload: {
      code: code,
    },
  };
};
