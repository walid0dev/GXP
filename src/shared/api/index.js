import axios from "axios";

const DEFAULT_BASE_URL = "https://api.rawg.io/api";
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;

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
 * @typedef {Object} RawgApiConfig
 * @property {string} [apiKey]
 * @property {string} [baseURL]
 * @property {import("axios").AxiosInstance} [axiosInstance]
 */

/**
 * @returns {string | undefined}
 */
function getEnvApiKey() {
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return import.meta.env.RAWG_API_KEY || import.meta.env.VITE_RAWG_API_KEY;
  }

  return undefined;
}

/**
 * @param {string | undefined} configuredApiKey
 * @returns {string}
 */
function resolveApiKey(configuredApiKey) {
  const apiKey = configuredApiKey || getEnvApiKey();

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
 * @param {import("axios").AxiosInstance} client
 * @param {string} path
 * @param {string} apiKey
 * @param {Record<string, unknown>} [params]
 */
async function request(client, path, apiKey, params = {}) {
  const response = await client.get(path, {
    params: {
      key: apiKey,
      ...params,
    },
  });

  return response.data;
}

/**
 * @param {RawgApiConfig} [config]
 */
export function createRawgApi(config = {}) {
  const baseURL = config.baseURL || DEFAULT_BASE_URL;
  const client = config.axiosInstance || axios.create({ baseURL });
  const getApiKey = () => resolveApiKey(config.apiKey);

  return {
    /**
     * @param {PaginationOptions & QueryFilters} [options]
     * @returns {Promise<RawgListResponse<RawgGame>>}
     */
    getGames(options = {}) {
      const {
        page = DEFAULT_PAGE,
        pageSize = DEFAULT_PAGE_SIZE,
        ...filters
      } = options;

      return request(client, "/games", getApiKey(), {
        page,
        page_size: pageSize,
        ...filters,
      });
    },

    /**
     * @param {number} id
     * @param {QueryFilters} [options]
     * @returns {Promise<RawgGame>}
     */
    getGameById(id, options = {}) {
      assertId(id);

      return request(client, `/games/${id}`, getApiKey(), options);
    },

    /**
     * @param {PaginationOptions & QueryFilters} [options]
     * @returns {Promise<RawgListResponse<RawgCreator>>}
     */
    getCreators(options = {}) {
      const {
        page = DEFAULT_PAGE,
        pageSize = DEFAULT_PAGE_SIZE,
        ...filters
      } = options;

      return request(client, "/creators", getApiKey(), {
        page,
        page_size: pageSize,
        ...filters,
      });
    },

    /**
     * @param {number} id
     * @param {QueryFilters} [options]
     * @returns {Promise<RawgCreator>}
     */
    getCreatorById(id, options = {}) {
      assertId(id);

      return request(client, `/creators/${id}`, getApiKey(), options);
    },
  };
}

const rawgApi = createRawgApi();

export const getGames = rawgApi.getGames;
export const getGameById = rawgApi.getGameById;
export const getCreators = rawgApi.getCreators;
export const getCreatorById = rawgApi.getCreatorById;

export default rawgApi;
