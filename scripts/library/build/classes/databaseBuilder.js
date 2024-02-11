import { Player, world } from '@minecraft/server';
//The better version!
/**
 * A class for interacting with a database.
 * @class
 */
export default class Database {
  /**
   * Constructs a new databaseBuilder instance.
   * @param {Player|Null} [player=null] - The player: Optional parameter, Defaults to null.
   * @constructor
   */
  constructor(player = null) {
    this.player = player;
  }

  /**
   * Sets a dynamic property in the world or for a specific player.
   * @param {String} key - The key for the dynamic property.
   * @param {Number|Boolean|String} value - The value to be stored.
   */
  set(key, value) {
    if (this.player) {
      this.player.setDynamicProperty(key, value);
    } else {
      world.setDynamicProperty(key, value);
    }
  }

  /**
   * Checks if a dynamic property exists in the world or for a specific player.
   * @param {String} key - The key for the dynamic property.
   * @returns {Boolean} True if the dynamic property exists, otherwise false.
   */
  has(key) {
    const dynamicProperty = this.player ? this.player.getDynamicProperty(key) : world.getDynamicProperty(key);
    return dynamicProperty;
  }

  /**
   * Gets the value of a dynamic property from the world or for a specific player.
   * @param {String} key - The key for the dynamic property.
   * @returns {Number|Boolean|String|Null} The value of the dynamic property, or null if it doesn't exist.
   */
  get(key) {
    const dynamicProperty = this.player ? this.player.getDynamicProperty(key) : world.getDynamicProperty(key);

    return dynamicProperty || 0;
  }

  /**
   * Deletes a dynamic property from the world or for a specific player.
   * @param {String} key - The key for the dynamic property.
   */
  delete(key) {
    if (this.player) {
      if (this.player.getDynamicProperty(key) === undefined) {
        console.warn(`Dynamic property: ${key} does not exist!`);
      } else {
        this.player.setDynamicProperty(key, undefined);
      }
    } else {
      if (world.getDynamicProperty(key) === undefined) {
        console.warn(`Dynamic property: ${key} does not exist!`);
      } else {
        world.setDynamicProperty(key, undefined);
      }
    }
  }
};