import { Injectable } from '@nestjs/common';

@Injectable()
export class IslandsService {
    getIslands(){
        return {'islands': []}
    }

    getIsland(id){
        if(id){
            return {'msg': id}
        }else{
            return {'msg': 'You should give pagination options.'}
        }
    }
}
