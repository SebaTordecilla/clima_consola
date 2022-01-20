require('dotenv').config();
require('colors');


const {
    inquirerMenu,
    leerInput,
    pausa,
    listarLugares

} = require('./helpers/inquirer');

const Busquedas = require('./models/busquedas');


const main = async() => {
    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();
        //console.log({ opt });
        switch (opt) {
            case 1:
                //mostrar msje
                const termino = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(termino);



                const id = await listarLugares(lugares);
                if (id === '0') continue;

                const lugarSel = lugares.find(l => l.id === id);

                busquedas.agregarHistorial(lugarSel.nombre);
                const latlon = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

                //console.log({ id });


                //mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temp:', latlon.temp);
                console.log('Min:', latlon.min);
                console.log('Max:', latlon.max);
                console.log('Desc:', latlon.desc);

                break;
            case 2:
                busquedas.historial.forEach((lugar, i) => {
                    const idx = `${ i + 1 }.`.green;
                    console.log(`${ idx } ${ lugar } `);
                })

                break;
            case 0:

                break;

        }
        if (opt !== 0) await pausa();

    } while (opt !== 0) {
        //pausa();
    }


}

main();