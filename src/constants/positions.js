export const positionCodes = {
    qb: 'QB',
    wr: 'WR',
    rb: 'RB',
    te: 'TE',
    d: 'DEF',
    k: 'K',
    idp: 'IDP',
    p: 'P'
};

export const flexStartPosition = 7;

export const positions = ['Quarterback', 'Running Back', 'Wide Receiver', 'Tight End', 'Defense', 'Kicker', 'IDP', 'Punter'];

//Basically just set an object where idp and punter are default false
export const teamSpots = positions.map((pos, i) =>  ({ posName: pos, posCode: positionCodes[Object.keys(positionCodes)[i]] }));

export const basicCounter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const teamStructure = {
    positions: {
        qb: {
            infinite: true,
            starter: 1,
            amount: 1,
            isFlexable: false,
            name: positionCodes.qb,
            posName: positions[0],
            onRoster: true
        },
        rb: {
            infinite: true,
            starter: 2,
            amount: 4,
            isFlexable: true,
            name: positionCodes.rb,
            posName: positions[1],
            onRoster: true
        },
        wr: {
            infinite: true,
            starter: 2,
            amount: null,
            isFlexable: true,
            name: positionCodes.wr,
            posName: positions[2],
            onRoster: true
        },
        te: {
            infinite: true,
            starter: 1,
            isFlexable: true,
            amount: null,
            name: positionCodes.te,
            posName: positions[3],
            onRoster: true
        },
        def: {
            infinite: true,
            starter: 1,
            isFlexable: false,
            amount: null,
            name: positionCodes.d,
            posName: positions[4],
            onRoster: true
        },
        k: {
            infinite: true,
            starter: 1,
            isFlexable: false,
            amount: 2,
            name: positionCodes.k,
            posName: positions[5],
            onRoster: true
        },
        idp: {
            infinite: true,
            starter: 1,
            isFlexable: false,
            amount: null,
            name: positionCodes.idp,
            posName: positions[6],
            onRoster: false
        },
        p: {
            infinite: true,
            starter: 1,
            isFlexable: false,
            amount: null,
            name: positionCodes.p,
            posName: positions[7],
            onRoster: false
        }
    },
    rosterSpots: null,
    benchSpots: 6,
    flexSpots: 1
};
