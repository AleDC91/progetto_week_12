import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { SECRET_KEY } from "../config";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import userReducer from "../reducers/userReducer";
import siteSettingsReducer from "../reducers/siteSettingsReducer";


const initialState = {
  
  user: {},
  siteSettings: {}
};

const bigReducer = combineReducers({
  user: userReducer,
  siteSettings: siteSettingsReducer
});

const persistentConfig = {
  key: "root",
  storage,
  transform: [
    encryptTransform({
      secretKey: SECRET_KEY,
      onError: function (error) {
        console.error(error);
      },
    }),
  ],
};

const persistedReducer = persistReducer(persistentConfig, bigReducer);

export const store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);
