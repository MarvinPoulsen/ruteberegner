
MODULE SCHOOL_ROAD
--------------------
Modul til ruteberegning fra skole til elev.

DEPRECATION
--------------------
Deprecates: none         
Deprecated by: none

DOCUMENTATION
--------------------
No external documentation

INSTALLATION
--------------------

1: Installation  
1a: Tilføj følgende linje til modules filen:

      <module name="school_road_simple" dir="custom/school_road_simple" permissionlevel="public" />

2: Tilføj parametrer til relevante cbinfo-filer:
2a: Parameteren skal indholde minimapid'et fra det ønskede minimap

	<param name="module.school_road_simple.minimapid">d2c4h790-f45c-4fed-a2vb-sfgo954vhke1</param>

3: Ret parametrer i deploy.xml:

	<param name="module.school_road_simple.route.profile">skolerute</param>
	<param name="module.school_road_simple.logo">/images/custom/Lolland9.png</param>

4: Ret datasources.xml
4a: Så den peger på en tabel med punkter for hver skole:

	<datasource endpoint="ep_lk_school_road_simple" name="lk_school_road_simple_skoler">
		<table geometrycolumn="geom" name="skoler" pkcolumn="id" schema="skoler"/>
	</datasource>

4b: Tabellen 'skoler' skal indeholde disse atributter:
      id: serial4 NOT NULL;
      skole: string;
      vejnavn: string;
      husnummer: string;
      postnummer: number;
      by: string;
      geom: geometry(point);
	

PARAMETERS
--------------------
<param name="module.school_road_simple.minimapid">d2c4h790-f45c-4fed-a2vb-sfgo954vhke1</param>
<param name="module.school_road_simple.route.profile">skolerute</param>
<param name="module.afstand.spsroute.routeservice">/spsroute/api/1.0</param>
<param name="module.school_road_simple.logo">/images/custom/Lolland9.png</param>
<param name="module.school_road_simple.searchresult.number">15</param>

Read [here](https://docs.spatialsuite.com/?valgtedokument=1248) about best practices when defining parameters.


LIMITATIONS
--------------------
None

DEPENDENCIES
--------------------
Modulet bygger på SpsRouter.
Det er en forudsætning, at SpsRoute Routing Service er installeret, hvor løsningen skal bruges.

CHANGES
--------------------
```
Date           Version        Ini            Description 
2023-10-23     0.9.0          MARPO          Modulet oprettet

```