import axios from "axios";

const DEFAULT_BASE_URL = "https://api.rawg.io/api";
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 12;

/**
 * @typedef {Object} PaginationOptions
 * @property {number} [page=1]
 * @property {number} [pageSize=20]
 */

/**
 * @typedef {Record<string, string | number | boolean | Array<string | number | boolean>>} QueryFilters
 */

/**
 * @template T
 * @typedef {Object} RawgListResponse
 * @property {number} count
 * @property {string | null} next
 * @property {string | null} previous
 * @property {T[]} results
 */

/**
 * @typedef {Object} RawgGame
 * @property {number} id
 * @property {string} name
 * @property {string} slug
 * @property {string} [released]
 * @property {string} [background_image]
 * @property {number} [rating]
 * @property {number} [ratings_count]
 */

/**
 * @typedef {Object} RawgCreator
 * @property {number} id
 * @property {string} name
 * @property {string} slug
 * @property {string} [image]
 * @property {string} [image_background]
 */

/**
 * @returns {string | undefined}
 */
function getEnvApiKey() {
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return import.meta.env.VITE_RAWG_API_KEY || import.meta.env.RAWG_API_KEY;
  }

  return undefined;
}

/**
 * @returns {string}
 */
function resolveApiKey() {
  const apiKey = getEnvApiKey();

  if (!apiKey) {
    throw new Error("RAWG_API_KEY is missing. Set it in your environment.");
  }

  return apiKey;
}

/**
 * @param {number} id
 */
function assertId(id) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new TypeError("A positive numeric id is required.");
  }
}

/**
 * @param {string} path
 * @param {Record<string, unknown>} [params]
 */
async function request(path, params = {}) {
  console.info("fetching data", path, params);
  const response = await client.get(path, {
    params: {
      key: apiKey,
      ...params,
    },
  });

  return response.data;
}

const client = axios.create({ baseURL: DEFAULT_BASE_URL });
const apiKey = resolveApiKey();

/**
 * @param {PaginationOptions & QueryFilters} [options]
 * @returns {Promise<RawgListResponse<RawgGame>>}
 */
export function getGames(options = {}) {
  const {
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    ...filters
  } = options;

  return request("/games", {
    page,
    page_size: pageSize,
    ...filters,
  });
}

/**
 * @param {number} id
 * @param {QueryFilters} [options]
 * @returns {Promise<RawgGame>}
 */
export function getGameById(id, options = {}) {
  assertId(id);

  return request(`/games/${id}`, options);
}

/**
 * @param {PaginationOptions & QueryFilters} [options]
 * @returns {Promise<RawgListResponse<RawgCreator>>}
 */
export function getCreators(options = {}) {
  const {
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    ...filters
  } = options;

  return request("/creators", {
    page,
    page_size: pageSize,
    ...filters,
  });
}

/**
 * @param {number} id
 * @param {QueryFilters} [options]
 * @returns {Promise<RawgCreator>}
 */
export function getCreatorById(id, options = {}) {
  assertId(id);

  return request(`/creators/${id}`, options);
}

const rawgApi = {
  getGames,
  getGameById,
  getCreators,
  getCreatorById,
};

export default rawgApi;
