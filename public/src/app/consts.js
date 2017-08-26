"use strict";
exports.SERVER_ADDRESS = "localhost:8081";
exports.NUMBER_LENGH = 4;
exports.MISSING_HOST_ELEMENT_MESSAGE = "Host element cannot be null, undentified or an empty string!";
exports.INVALID_HOST_ELEMENT_MESSAGE = "Invalid host element! A valid html element identifier or jquery html object should be provided!";
exports.INVALID_PLAYER_MODE_MESSAGE = "Invalid player mode!";
exports.MISSING_GAME_NAME_MESSAGE = "Game name should be specified before starting a new game!";
exports.MISSING_NICKNAME_MESSAGE = "A non empty nickname should be specified before starting a new game!";
exports.MISSING_GAME_TYPE_MESSAGE = "Game type should be specified before starting a new game!";
exports.SINGLE_PLAYER = 0;
exports.MULTIPLAYER = 1;
exports.PEER_2_PEER = 2;
exports.CREATE_GAME_EVENT = "create game";
exports.START_GAME_EVENT = "start game";
exports.GAME_STARTED_SERVER_EVENT = "game started server event";
exports.SURRENDER_GAME_EVENT = "surrender game";
exports.GUESS_NUMBER_EVENT = "guess number";
exports.GUESS_NUMBER_SERVER_EVENT = "guess number server event";
exports.GUESS_PEER_NUMBER_EVENT = "guess peer number";
exports.GUESS_PEER_NUMBER_SERVER_EVENT = "check peer number";
exports.GUESS_PEER_NUMBER_CLIENT_RESPONSE_EVENT = "check peer number response";
exports.GUESS_PEER_NUMBER_RESPONSE_EVENT = "guess peer number response";
exports.GAME_OVER_EVENT = "game over";
exports.GAME_OVER_PEER_CLIENT_EVENT = "game over peer client";
exports.GAME_OVER_PEER_SERVER_EVENT = "game over peer server";
exports.JOIN_GAME_EVENT = "join game";
exports.JOIN_GAME_SERVER_EVENT = "join server game";
exports.LIST_GAMES_EVENT = "list games";
exports.LIST_GAMES_RESPONSE_EVENT = "list games response";
exports.LIST_GAME_PLAYERS_EVENT = "list players";
exports.POST_NUMBER_EVENT = "post number";
exports.POST_NUMBER_RESPONSE_EVENT = "post number response";
exports.PLAYER_TURN_SERVER_EVENT = "player turn";
exports.CHECK_NICKNAME_EXISTS_EVENT = "nickname exists";
exports.CHECK_NICKNAME_EXISTS_RESPONSE_EVENT = "nickname exists response";
//# sourceMappingURL=consts.js.map