import { isTouch, eventsName } from './Base';

const getPercentage = ({ event, mode, dom }) => {
    let result = null;
    let rect = dom.getBoundingClientRect();
    let x = isTouch ? event.touches[0].pageX : event.x;
    let y = isTouch ? event.touches[0].pageY : event.y;

    if(mode === 'lr' || mode === 'rl'){
        let relativeX = x - rect.left;
        let width = rect.width;

        if(relativeX < 0){
            relativeX = 0;
        }

        if(relativeX > width){
            relativeX = width;
        }

        result = relativeX / width;

        if(mode === 'rl'){
            result = 1 - result;
        }
    } else{
        let relativeY = y - rect.top;
        let height = rect.height;

        if(relativeY < 0){
            relativeY = 0;
        }

        if(relativeY > height){
            relativeY = height;
        }

        result = relativeY / height;

        if(mode === 'bt'){
            result = 1 - result;
        }
    }

    return result;
};

const disabledSelection = (event) => {
    event.preventDefault();
};

class RangeComp{
    constructor({
        /*
         * Number mode
         * lr
         * rl
         * tb
         * bt
         */
        mode = 'lr',
        container = null,
        onDragStart = null,
        onDragging = null,
        onDragEnd = null
    }){
        if(!container){
            throw new Error('PARAMETER ERROR: container');
        }
        this.container = container;

        const move = (event) => {
            onDragging && onDragging(event);

            this.value = getPercentage({
                event,
                mode,
                dom : container
            });

            event.preventDefault();
        };

        const up = () => {
            onDragEnd && onDragEnd();

            document.removeEventListener(eventsName[1], move);
            document.removeEventListener('selectstart', disabledSelection);
            document.removeEventListener(eventsName[2], up);
        };

        container['on' + eventsName[0]] = (event) => {
            this.value = getPercentage({
                event,
                mode,
                dom : container
            });

            onDragStart && onDragStart(event);

            document.addEventListener(eventsName[1], move, { passive : false });
            document.addEventListener('selectstart', disabledSelection);
            document.addEventListener(eventsName[2], up);
        };
    }

    destroy(){
        this.container['on' + eventsName[0]] = null;
    }
}

window.RangeComp = RangeComp;
// export default RangeComp;