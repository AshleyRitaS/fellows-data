import Image from "next/image";


export default function Item ({item}) {

    var stats = [];
    item.stats.primary.forEach(element => {
        stats.push(element);
    });
    item.stats.secondary.forEach(element => {
        stats.push(element);
    });

    var statsOutput = stats.reduce((acc, cur) => {
        return <>{acc} <li>{cur}</li></>
    }, <></>)

    var setsOutput = item.sets.reduce((acc, cur, index) => {
        var setNumber = 0;
        switch (index) {
            case 0:
                setNumber = 2;
                break;
            case 1:
                setNumber = 3;
                break;
            case 2:
                setNumber = 5;
                break;
        }
        return <>{acc} <li>{setNumber}-set: {cur.description}</li></>
    }, <></>)

    var powerOutput = <></>
    if (item.power) {
        powerOutput = (
            <li>{item.power.name}: <span dangerouslySetInnerHTML={{__html:item.power.description}}/></li>
        )
    }
    
    return (
        <div className="item">
            <div className="itemHeader">
                <Image width={30} height={30} src={item.icon || null} alt={"Icon for "+item.name}></Image>
                <span className="itemName">{item.name}</span>
            </div>
            <span className="itemSlot">{item.type}</span>
            <div className="itemStats">
                <ul>
                    {statsOutput}
                </ul>
            </div>
            <div className="itemSets">
                <ul>
                    {setsOutput}
                </ul>
            </div>
            <div className="itemPower">
                <ul>
                    {powerOutput}
                </ul>
            </div>
        </div>
    )
}