class HashMap{
    constructor(){
        this.table = new Array(3)
        this.numItems  = 0;
    }

    hashStringToInt(s,tableSize){
        let hash = 17;
        for(let i=0;i<i<s.length;i++){
            hash = ((hash*23)+s.charCodeAt(i))%tableSize;
        }
        return hash;
    }

    resize(){
        let newTable = new Array(this.table.length*2);
        this.table.forEach(item=>{
            if(item){
                item.forEach(([key,value])=>{
                    let index = this.hashStringToInt(key,newTable.length)
                    if(newTable[index]){
                        newTable[index].push([key,value])
                    }else{
                        newTable[index] = [[key,value]]
                    }
                })
            }
        })
        this.table = newTable
    }
    set(key,value){
        this.numItems++;
        let index = this.hashStringToInt(key,this.table.length);
        let loadFactor = this.numItems/this.table.length;
      if(loadFactor > 0.75){
        this.resize()
      }
      if(this.table[index]){
        this.table[index][0] = [key,value]
      }else{
        this.table[index] = [[key,value]]
      }
    }

    get(key){
        let index = this.hashStringToInt(key,this.table.length);
        if(!this.table[index]){
            return null;
        }
        return this.table[index].find(x=>x[0]===key)
    }

    has(hasKey){
        let res = this.keys().find(key=>key===hasKey)

        if(res){
            return true;
        }else{
            return false;
        }
    }

    length(){
        return this.numItems;
    }
    clear(){
        this.table = []
        return this.table;
    }
    keys(){
        let keyArray = new Array()
        this.table.forEach(item=>{
            item.forEach(x=>{
                keyArray.push(x[0])
            })
        })
        return keyArray;
    }

    values(){
        let valueArray = new Array()
        this.table.forEach(item=>{
            item.forEach(x=>{
                valueArray.push(x[1])
            })
        })
        return valueArray;
    }
    entries(){
        let entryArray = new Array()
        this.table.forEach(item=>{
            item.forEach(x=>{
                entryArray.push(x)
            })
        })
        return entryArray;
    }

    remove(hkey){
        if(this.has(hkey)){
            this.table.forEach((item,index)=>{
                item.forEach(([key,value])=>{
                    if(key===hkey){
                        this.table.splice(index,1)
                    }
                })
            })
        }
        return this.table;
    }
}

let test = new HashMap()
test.set('apple','red')
test.set('banana','yellow')
console.log(test.entries())