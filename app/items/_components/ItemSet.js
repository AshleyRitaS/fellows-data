import Item from "./Item"


export default function ItemSet({items, visible}) {
    if (!visible) {
        return <></>
    }
    console.log(items);
    var output = items.reduce((acc, cur)=> {
        return <>{acc} <Item item={cur}/></>
    }, <></>)

    return (
        <div className="itemSet">
            {output}
        </div>
    )
}