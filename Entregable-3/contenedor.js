export default class Container {
    constructor(fileName) {
        this.fileName = fileName;
        const fs = require('fs')
        this.fs = fs;
    }

     save(object) {
        // The response of this method will be a promise
        const p = new Promise((resolve, reject) => {
            // Try to read the file
             this.fs.readFile(this.fileName, (error, content) => {
                if (error) {
                    // Means the file does not yet exist
                    // Create a new object that will be added to the file
                    const newObject = {object, id : 1}
                    const objects = [newObject]
                    this.fs.writeFile(this.fileName, JSON.stringify(objects), (error) => {
                        if (error) {
                            resolve('There was an error writing the object', error);
                        } else {
                            resolve('The object was saved successfully');
                        }    
                    })
                } else {
                    // Means the file already exists
                    const parsedContent = JSON.parse(content);
                    let alreadySaved = false;
                    parsedContent.forEach(element => {
                        const stringifyElement = JSON.stringify(element.object);
                        const stringifyObject = JSON.stringify(object)
                        if (stringifyElement === stringifyObject) {
                            alreadySaved = true;
                        }
                    });
                    if (alreadySaved) {
                        resolve("The object is already saved");
                    } else {
                        const nextID = parsedContent.length + 1;
                        const newObject = {object, id : nextID}
                        const objects = [...parsedContent, newObject]
                         this.fs.writeFile(this.fileName, JSON.stringify(objects), (error) => {
                            if (error) {
                                resolve('There was an error writing the object', error);
                            } else {
                                resolve('The object was saved successfully');
                            }    
                        })
                    }
                }
            })
        })
        return p
    }

     getById(id) {
        const p = new Promise((resolve, reject) => {
            this.fs.readFile(this.fileName, (error, content) => {
                if (error) {
                    // Means the file does not yet exist
                    resolve('There is no file with any object.');
                } else {
                    // Means the file already exists
                    const parsedContent = JSON.parse(content);
                    let alreadySaved = false;
                    parsedContent.forEach(element => {
                        if (Number(element.id) === id) {
                            resolve(element);
                            alreadySaved = true;
                        }
                    });
                    if (!alreadySaved) { resolve('No object with that id exists') }
                }
            })
        })
        return p
    }

     getAll() {
        const p = new Promise( (resolve, reject) => {
            this.fs.readFile(this.fileName, (error, content) => {
               if (error) {
                   // Means the file does not yet exist
                   resolve('There is no file with any object.');
               } else {
                   // Means the file already exists
                   const parsedContent = JSON.parse(content);
                   resolve(parsedContent);
               }
           })
        }) 
        return p
    }

    deleteById(id) {
        const p = new Promise( (resolve, reject) => {
            this.fs.readFile(this.fileName, (error, content) => {
                if (error) {
                    // Means the file does not yet exist
                    resolve('There is no file with any object.');
                } else {
                    // Means the file already exists
                    const parsedContent = JSON.parse(content);
                    let position = -1;
                    parsedContent.forEach((element, index) => {
                        if (element.id === id) {
                            position = index;
                        }
                    });
                    if (position !== -1) {
                        parsedContent.splice(position);
                        // now save everything up again to the file
                        this.fs.writeFile(this.fileName, JSON.stringify(parsedContent), (error) => {
                            if (error) {
                                resolve('There was an error writing the object', error);
                            } else {
                                resolve('The item was deleted successfully');
                            }    
                        })
                    } else {
                        resolve('No object with that id exists');
                    }
                }
            })
        })
        return p
    }

    deleteAll() {
        const p = new Promise ( (resolve, reject) => {
            this.fs.readFile(this.fileName, (error, content) => {
                if (error) {
                    // Means the file does not yet exist
                    resolve('There is no file with any object.');
                } else {
                    // Means the file exists
                    this.fs.writeFile(this.fileName, JSON.stringify([]), (error, content) => {
                        if (error){
                            resolve('There was an error deleting the files');
                        } else {
                            resolve('Everything was deleted from the file');
                        }
                    })
                }
            })
        })
        return p
    }

    getRandomProduct() {
        const p = new Promise( (resolve, reject) => {
            resolve()
            return p
        })
    }
}

