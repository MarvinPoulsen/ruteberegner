import React, { FC, useRef, useState } from 'react';
import Map from '../minimap/Minimap';
import Form from '../form/Form';
import Navbar from '../navbar/Navbar';
import { schoolsMinimapId } from '../../../config';
import './app.scss';

export interface SkoleDataRow {
    id: string;
    skole: string;
    vejnavn: string;
    husnummer: string;
    postnummer: number;
    by: string;
    shape_wkt: { wkt: string };
}
export interface SkoleData {
    id: number;
    skole: string;
    adresse: string;
    latLong: string;
}
export interface DistrikterDataRow {
    id: string;
    udd_distrikt_navn: string;
    shape_wkt: { wkt: string };
}

const App: FC = () => {
    const minimap: any = useRef(null);
    const [skoleData, setSkoleData] = useState<SkoleData[]>([]);
    const [logo, setLogo] = useState<string|null>(null);
    const [kommunenr, setKommunenr] = useState();
    const [maxSuggestions, setMaxSuggestions] = useState<number>(5);

    const onMapReady = (mm) => {
        minimap.current = mm;
        const ses = mm.getSession();
        const ds = ses.getDatasource('lk_school_road_skoler');
        ds.execute({ command: 'read' }, (rows: SkoleDataRow[]) => {
            const data = rows.map((element) => {
                const wkt = element.shape_wkt.wkt;
                const start = wkt.search(/[0-9]/);
                const end = wkt.search(/[)]/);
                const subStr = wkt.substring(start, end);
                const latLong = subStr.replace(' ', ',');
                const adresse = `${element.vejnavn} ${element.husnummer}, ${element.postnummer} ${element.by}`;
                return {
                    id: parseInt(element.id as string),
                    skole: element.skole,
                    adresse,
                    latLong,
                };
            });
            setSkoleData(data);
        });
        const siteUrl = minimap.current.getSession().getParam('cbinfo.site.url');
        const logoUrl = minimap.current.getSession().getParam('module.school_road.logo');
        const searchresultNumber = minimap.current.getSession().getParam('module.school_road.searchresult.number');
        const kommunenummer = minimap.current.getSession().getParam('config.kommunenr.firecifre');
        setLogo(siteUrl + logoUrl);
        setKommunenr(kommunenummer);
        setMaxSuggestions(searchresultNumber);
    };

    const calculate = async (
        schoolId: number,
        toCoord: string,
    ) => {
        const siteUrl = minimap.current.getSession().getParam('cbinfo.site.url');
        const apiUrl = minimap.current.getSession().getParam('module.afstand.spsroute.routeservice');
        const routeProfile = minimap.current.getSession().getParam('module.school_road.route.profile');
        const school = skoleData.find((item) => item.id === schoolId);
        if (school){
        const url = `${siteUrl}${apiUrl}/route?profile=${routeProfile}&from=${school.latLong}&to=${toCoord}&srs=epsg:25832&lang=da`;
        const req = await fetch(url);
        const result = await req.json();
        minimap.current.getMapControl().setMarkingGeometry(result.wkt, true, null, 100);
    }
    };

    return (
        <>
            <section className="hero is-info is-small">
                {logo && <Navbar logo={logo} />}
            </section>
            <section className="section init-height">
                <div className="container">
                    <div className="columns">
                        <div className="column is-4 box">
                            {kommunenr && (
                                <Form
                                    data={skoleData}
                                    onCalculate={calculate}
                                    kommunenr={kommunenr}
                                    maxSuggestions={maxSuggestions}
                                />
                            )}
                        </div>
                        <Map
                            id={schoolsMinimapId}
                            name="schools"
                            size="is-8"
                            onReady={onMapReady}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default App;
