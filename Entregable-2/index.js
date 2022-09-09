class Container {
    constructor(fileName) {
        this.fileName = fileName;
        const fs = require('fs')
        this.fs = fs;
        this.idGenerator = 1
    }

    save(object) {
        // Try to read the file
        this.fs.readFile(this.fileName, (error, content) => {
            if (error) {
                // Means the file does not yet exist
                // Create a new object that will be added to the file
                const newObject = {object, id : 1}
                const objects = [newObject]
                this.fs.writeFile(this.fileName, JSON.stringify(objects), (error) => {
                    if (error) {
                        console.log('There was an error writing the object', error);
                    } else {
                        console.log('The object was saved successfully');
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
                    console.log("The object is already saved");
                } else {
                    const nextID = parsedContent.length + 1;
                    const newObject = {object, id : nextID}
                    const objects = [...parsedContent, newObject]
                    this.fs.writeFile(this.fileName, JSON.stringify(objects), (error) => {
                        if (error) {
                            console.log('There was an error writing the object', error);
                        } else {
                            console.log('The object was saved successfully');
                        }    
                    })
                }
            }
        })
    }

    getById(id) {
        this.fs.readFile(this.fileName, (error, content) => {
            if (error) {
                // Means the file does not yet exist
                console.log('There is no file with any object.');
            } else {
                // Means the file already exists
                const parsedContent = JSON.parse(content);
                let alreadySaved = false;
                parsedContent.forEach(element => {
                    if (Number(element.id) === id) {
                        console.log('Returning object with the selected id: ', element);
                        alreadySaved = true;
                    }
                });
                if (!alreadySaved) { console.log('No object with that id exists'); }
            }
        })
    }

    getAll() {
        console.log("Waiting");
        this.fs.readFile(this.fileName, (error, content) => {
            if (error) {
                // Means the file does not yet exist
                console.log('There is no file with any object.');
            } else {
                // Means the file already exists
                const parsedContent = JSON.parse(content);
                console.log(parsedContent);
                return parsedContent;
            }
        })
    }

    deleteById(id) {
        this.fs.readFile(this.fileName, (error, content) => {
            if (error) {
                // Means the file does not yet exist
                console.log('There is no file with any object.');
            } else {
                // Means the file already exists
                const parsedContent = JSON.parse(content);
                console.log(parsedContent);
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
                            console.log('There was an error writing the object', error);
                        } else {
                            console.log('The item was deleted successfully');
                        }    
                    })
                } else {
                    console.log('No object with that id exists');
                }

            }
        })
    }

    deleteAll() {
        this.fs.readFile(this.fileName, (error, content) => {
            if (error) {
                // Means the file does not yet exist
                console.log('There is no file with any object.');
            } else {
                // Means the file exists
                this.fs.unlink(this.fileName, (error, content) => {
                    if (error) {

                    } else {
                        console.log('Deleted');
                    }
                });
            }
        })
    }
}

const container = new Container('products.txt')
const p1 = {
    title : 'Product # 1',
    price : 159,
    thumbnail : 'url'
}

const p2 = {
    title : 'Product # 2',
    price : 99,
    thumbnail : 'url'
}

container.save(p1)
// container.getById(4)
// container.getAll()
// container.deleteById(1)
container.deleteAll()
