class Person {

    constructor(name, address) {
        this.name = name;
        this.address = address;
    }

    toString() {
        return `${this.name} ${this.address.toString()}`
    }

    greet() {
        console.log("hello");
    }
}

class Address {

    constructor(city, country) {
        this.city = city;
        this.country = country;
    }

    toString() {
        return `${this.city} ${this.country}`
    }
}


class Serialize {

    constructor(types) {
        this.types = types;
    }

    markRecursive(object) {
        //console.log(object,object.constructor.name);
        let index = this.types.findIndex((t) => {
            return t.name === object.constructor.name;
        });
       // console.log(index);
        if (index != -1) {

            object["typeIndex"] = index;

           // console.log(object);

            for (let key in object) {
               // console.log(object.hasOwnProperty(key),key);
                if (object.hasOwnProperty(key) && object[key] != null) {
                    this.markRecursive(object[key])
                }
            }
        }
    }

    reconstructRecursive(object) {

        //console.log(object,"1");

        if (object.hasOwnProperty('typeIndex')) {

            let type = this.types[object.typeIndex];

            let obj = new type();

            for (let key in object) {

                if (object.hasOwnProperty(key) && object[key] != null) {
                    obj[key] = this.reconstructRecursive(object[key])
                }
            }

           // console.log(obj);

            delete obj.typeIndex;
            //console.log(obj)
            return obj
        }
        
        return object;
    }


    clone(object) {
        this.markRecursive(object);
        //console.log(JSON.stringify(object));
        let copy = JSON.parse(JSON.stringify(object));
        //console.log(copy);
        return this.reconstructRecursive(copy);
    }
}

let p = new Person("naman", new Address("ahm", "india"));

let ser = new Serialize([Person, Address])

let y = ser.clone(p);

y.name = "abc";

y.address.city = "cal";
console.log(p.toString());
console.log(y.toString());
y.greet();
console.log(Person.name)