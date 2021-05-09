module.exports = class APILocation {
  constructor(kentaaApi, parentLocation, ownApiLocation, returnedListName)
  {
    this.parentLocation = parentLocation;
    if (typeof this.parentLocation === 'undefined' || !this.parentLocation){
      this.parentLocation = "";
    }
    this.parentId = -1;
    this.kentaaApi = kentaaApi;
    this.ownApiLocation = ownApiLocation;
    this.returnedListName = returnedListName;
  }

  get apiLocation(){
    if (this.parentId == -1) return `${this.parentLocation}${this.ownApiLocation}`
    return `${this.parentLocation}/${this.parentId}/${this.ownApiLocation}`
  }

  setParentId(newParentId)
  {
    this.parentId = newParentId;
  }
}