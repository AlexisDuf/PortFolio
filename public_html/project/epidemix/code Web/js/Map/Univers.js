var Univers = new Object();


/*
** Définition des pays
*/

var NorthAmer = [ countries["CA"], countries["US"] ],
	SouthAmer = [ countries["AG"], countries["AR"], countries["BB"], countries["BO"], countries["BR"], countries["BS"], countries["BZ"], countries["CL"], countries["CO"], countries["CR"], countries["CU"], countries["DM"], countries["DO"], countries["EC"], countries["GD"], countries["GF"], countries["GT"], countries["GY"], countries["HN"], countries["HT"], countries["KN"], countries["LC"], countries["MX"], countries["NI"], countries["PA"], countries["PE"], countries["PF"], countries["PY"], countries["SR"], countries["SV"], countries["TT"], countries["UY"], countries["VE"]]
	Europe = [countries["AT"], countries["BA"],countries["BE"], countries["BG"], countries["BY"], countries["CH"], countries["CY"], countries["CZ"], countries["DE"], countries["DK"], countries["EE"], countries["ES"], countries["FI"], countries["FR"], countries["GB"], countries["GR"], countries["HR"], countries["HU"], countries["IE"], countries["IT"], countries["LT"], countries["LV"], countries["MD"], countries["MK"], countries["MT"], countries["NL"], countries["NO"], countries["PL"], countries["PT"], countries["RO"], countries["RS"], countries["SE"], countries["SI"], countries["SK"], countries["TR"], countries["UA"] ],
	Asia = [countries["AE"], countries["AF"], countries["AM"], countries["AZ"], countries["BT"], countries["GE"], countries["ID"], countries["IL"], countries["IN"], countries["IQ"], countries["IR"], countries["JO"], countries["KG"], countries["KH"], countries["KP"], countries["KR"], countries["KW"], countries["KZ"], countries["LA"], countries["LB"], countries["LK"], countries["MM"], countries["MN"], countries["MV"], countries["MY"], countries["NP"], countries["OM"], countries["PH"], countries["PK"], countries["QA"], countries["SA"], countries["SY"], countries["TH"], countries["TJ"], countries["TM"], countries["TW"], countries["UZ"], countries["VN"], countries["YE"] ],
	Oceania = [countries["AU"], countries["BN"], countries["FJ"], countries["FK"], countries["NC"], countries["NZ"], countries["PG"], countries["SB"], countries["TL"], countries["VU"]],
	NorthAfr = [countries["BJ"], countries["CV"], countries["DZ"], countries["EG"], countries["ER"], countries["GH"], countries["GM"], countries["GN"], countries["GW"], countries["LR"], countries["LY"], countries["MA"], countries["MN"], countries["MR"], countries["NE"], countries["NG"], countries["SD"], countries["SL"], countries["SN"], countries["TD"], countries["TG"], countries["TN"] ],
	SouthAfr = [countries["AO"], countries["BD"], countries["BI"], countries["BW"], countries["CD"], countries["CF"], countries["CG"], countries["CI"], countries["CM"], countries["DJ"], countries["ET"], countries["GA"], countries["GQ"], countries["JM"], countries["KE"], countries["KM"], countries["LS"], countries["MG"], countries["MU"], countries["MW"], countries["MZ"], countries["NA"], countries["RE"], countries["RW"], countries["SC"], countries["SO"], countries["ST"], countries["SZ"], countries["TZ"], countries["UG"], countries["ZA"], countries["ZM"], countries["ZW"] ],
	Russia = [countries["RU"]],
	Japon = [countries["JP"]],
	Chine = [countries["CN"]],
	NorthWolrd = [countries["GL"], countries["IS"]];


/*
** On stocke les regroupement de pays dans l'objet global Univers
*/

/*
** Définition des paramètres pour chaque paramètre
Rappel du constructeur de CountryGroup(_countryGroupId,  _countries, _deathFactor, _contagionFactor, _guerisonFactor, _birthFactor)
**/

Univers["NorthAmer"] = new CountryGroup("NorthAmer", NorthAmer, 0.00001, 0.00001, 0.1, 0.3);
Univers["SouthAmer"] = new CountryGroup("SouthAmer", SouthAmer, 0.00008, 0.00005, 0.03, 0.5);
Univers["Europe"] = new CountryGroup("Europe", Europe, 0.00005, 0.00001, 0.1, 0.3);
Univers["Asia"] = new CountryGroup("Asia", Asia, 0.00006, 0.000035, 0.04, 0.1);
Univers["Oceania"] = new CountryGroup("Oceania", Oceania, 0.00007, 0.000040, 0.06, 0.4);
Univers["NorthAfr"] = new CountryGroup("NorthAfr", NorthAfr,0.0001, 0.000045, 0.05, 0.4);
Univers["SouthAfr"] = new CountryGroup("SouthAfr", SouthAfr,0.0006, 0.0009, 0.02, 0.8);
Univers["Russia"] = new CountryGroup("Russia", Russia,0.00005, 0.000035, 0.08, 0.3);
Univers["Japon"] = new CountryGroup("Japon", Japon,0.00004, 0.00002, 0.07, 0.1);
Univers["Chine"] = new CountryGroup("Chine", Chine, 0.00008, 0.00002, 0.05, 0.1);
Univers["NorthWolrd"] = new CountryGroup("NorthWolrd", NorthWolrd, 0.0001, 0.00005, 0.05, 0.2);


function nextUniversStep(){
	var nbDeadTotal=0,
		nbInfTotal=0;
	for (var i in Univers){
		for (var j=0; j < Univers[i].countries.length; j++){
			nbDeadTotal += Univers[i].countries[j].nbDead;
			nbInfTotal += Univers[i].countries[j].nbInfectes;
		}
	}


	$("#general-informations-infectes").text("Infectés : "+parseInt(nbInfTotal)+"" );
	$("#general-informations-dead").text("Décés : "+parseInt(nbDeadTotal)+"");
}