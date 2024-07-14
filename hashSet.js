class HashSet{
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
                item.forEach(([key])=>{
                    let index = this.hashStringToInt(key,newTable.length)
                    if(newTable[index]){
                        newTable[index].push([key])
                    }else{
                        newTable[index] = [key]
                    }
                })
            }
        })
        this.table = newTable
    }
    set(key){
        this.numItems++;
        let index = this.hashStringToInt(key,this.table.length);
        let loadFactor = this.numItems/this.table.length;
      if(loadFactor > 0.75){
        this.resize()
      }
      if(this.table[index]){
        this.table[index] = [key]
      }else{
        this.table[index] = [key]
      }
    }

    get(key){
        let index = this.hashStringToInt(key,this.table.length);
        if(!this.table[index]){
            return null;
        }
        return this.table[index].find(x=>x===key)
    }

    has(hasKey){
        let index = this.hashStringToInt(hasKey,this.table.length);
        let res = this.table[index].find(key=>key===hasKey)

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
                keyArray.push(x)
            })
        })
        return keyArray;
    }
    remove(hkey){
        if(this.has(hkey)){
            this.table.forEach((item,index)=>{
                item.forEach(([key])=>{
                    if(key===hkey){
                        this.table.splice(index,1)
                    }
                })
            })
        }
        return this.table;
    }
}

let test = new HashSet()
test.set('a')
test.set('b')
test.set('c')
console.log(test.keys())