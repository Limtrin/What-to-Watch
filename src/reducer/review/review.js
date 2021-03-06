import {extend} from "../../utils.js";
import history from "../../history";
import {loadComments} from "../data/data";

const initialState = {
  text: ``,
  sendStatusMessage: ``,
  formBlock: false,
  rating: 5,
};

const ActionType = {
  UPDATE_NEW_COMMENT_TEXT: `UPDATE_NEW_COMMENT_TEXT`,
  CHANGE_SEND_STATUS_TEXT: `CHANGE_SEND_STATUS_TEXT`,
  CHANGE_BLOCK_FORM: `CHANGE_BLOCK_FORM`,
  CHANGE_RATING: `CHANGE_RATING`,
};

const ActionCreator = {
  updateNewCommentText: (text) => ({
    type: ActionType.UPDATE_NEW_COMMENT_TEXT,
    payload: text,
  }),
  changeSendStatusText: (text) => ({
    type: ActionType.CHANGE_SEND_STATUS_TEXT,
    payload: text,
  }),
  changeBlockForm: (status) => ({
    type: ActionType.CHANGE_BLOCK_FORM,
    payload: status,
  }),
  changeRating: (rating) => ({
    type: ActionType.CHANGE_RATING,
    payload: rating,
  })
};

const Operation = {
  sendComment: (authData, film) => (dispatch, getState, api) => {
    dispatch(ActionCreator.changeBlockForm(true));
    return api.post(`/comments/${film.id}`, {
      rating: authData.rating,
      comment: authData.text,
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.updateNewCommentText(``));
          dispatch(ActionCreator.changeSendStatusText(``));
          dispatch(loadComments(film));
          history.push(`/films/${film.id}`);
        } else {
          dispatch(ActionCreator.changeSendStatusText(`Ой! Возникла какая-то ошибка...`));
        }
        dispatch(ActionCreator.changeBlockForm(false));
      })
      .catch(() => {
        dispatch(ActionCreator.changeSendStatusText(`Ой! Возникла какая-то ошибка...`));
        dispatch(ActionCreator.changeBlockForm(false));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_NEW_COMMENT_TEXT:
      return extend(state, {
        text: action.payload,
      });
    case ActionType.CHANGE_SEND_STATUS_TEXT:
      return extend(state, {
        sendStatusMessage: action.payload,
      });
    case ActionType.CHANGE_BLOCK_FORM:
      return extend(state, {
        formBlock: action.payload,
      });
    case ActionType.CHANGE_RATING:
      return extend(state, {
        rating: action.payload,
      });
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
