import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
const translations = {
  en: {
    selectLng: "Select language",
    next: "Next",
    welcome: "Welcome To",
    rvm: "Reverse vending machine",
    app: "app",
    login: "Login",
    login_with_Pass: "Login with phone number and password",
    phoneNumber: "Phone Number",
    password: "Password",
    pass: "pass....",
    createAccount: "Create an account",
    EnterFirstName: "Enter your First name",
    EnterLastName: "Enter your Last name",
    EnterPhone: "Enter phone number",
    EnterEmail: "Enter your email",
    createPass: "create a password",
    accountCreated: "your account created successfully",
    fillInfo: "Fill Identifications Below To Register",
    nationality: "Enter your Nationality",
    register: "register",
    lognSuccess: "login success! welcome",
    joinRecycling:
      "Join the recycling revolution and earn rewards for every plastic bottle you recycle with our reverse vending machine",
    selectMachine: "select the nearest RVM by your location",
    location: "Location",
    zone: "Zone",
    selectLocation: "select location",
    selectZone: "select zone",
    next: "next",
    selectbottletype: "select the type of bottle",
    getReverse:
      " get the reverse vending machine and throw the used beverage containers",
    mystats: "my contribution stats",
    totalReword: "TOTAL Rewards",
    withdraw: "withdraw",
    date: "Date",
    Contribution: "Contribution",
    Reward: "Reward",
    getMachineScan:
      "Get the reverse vending machine and throw the used beverage containers and don't forget QR scanning",
    scanQr: "scan QR returned by the RVM",
    Redeem: "Redeem points",
    paymentinfo: "PAYMENT INFO",
    currentBalance: "Current Balance",
    whereDoYouWantCash: "Where do you want to get the cash ?",
    transfer: "transfer",
    enterMoney: "Enter amaunt of money",
  },
  fr: {
    selectLng: "Choisissez la langue",
    next: "Suivant",
    welcome: "Bienvenue à",
    rvm: "Machine de collecte en inverse",
    app: "app",
    login: "connectez-vous",
    login_with_Pass:
      "Connectez-vous avec votre numéro de téléphone et votre mot de passe",
    phoneNumber: "Numéro de Téléphone",
    password: "mot de passe",
    pass: "mot....",
    createAccount: "Créez un compte",
    EnterFirstName: "Entrez votre prénom, s'il vous plaît",
    EnterLastName: "Entrez votre nom de famille",
    EnterPhone: "Veuillez saisir votre numéro de téléphone",
    EnterEmail: "Entrez votre adresse e-mail",
    createPass: "Créez un mot de passe",
    nationality: "Entrez votre nationalité",
    accountCreated: "Votre compte a été créé avec succès",
    fillInfo: "Remplissez les identifications ci-dessous pour vous inscrire",
    register: "enregistrer",
    lognSuccess: "Connexion réussie ! Bienvenue !",
    joinRecycling:
      "Rejoignez la révolution du recyclage et gagnez des récompenses pour chaque bouteille en plastique que vous recyclez grâce à notre distributeur automatique de retour",
    selectMachine:
      "Sélectionnez le RVM le plus proche en fonction de votre emplacement",
    location: "Emplacement",
    zone: "Zone",
    selectLocation: "Sélectionnez un emplacement",
    selectZone: "Zone sélectionnée",
    next: "Prochain",
    selectbottletype: "Sélectionnez le type de bouteille",
    getReverse:
      "Obtenez la machine de collecte inversée et jetez les contenants de boissons usagés",
    mystats: "Ma contribution statistique",
    totalReword: "Les récompenses Total",
    withdraw: "retirer",
    date: "Date",
    Contribution: "Contribution",
    Reward: "Récompense",
    getMachineScan:
      "Obtenez la machine de consigne inversée et jetez-y les contenants de boisson usagés, et n'oubliez pas de scanner les codes QR",
    scanQr: "Scannez le QR code renvoyé par le RVM",
    Redeem: "Échanger des points",
    paymentinfo: "INFORMATION DE PAIEMENT",
    currentBalance: "Solde actuel",
    whereDoYouWantCash: "Où voulez-vous retirer de l'argent ?",
    transfer: "transfert",
    enterMoney: "Entrez le montant d'argent",
  },
  kiny: {
    selectLng: "Hitamo ururimi",
    next: "ibikurikira",
    welcome: "ikaze kuri",
    rvm: "sisitemu y'imishani ishyirwamo",
    app: "ibyakoreshejwe",
    login: "injira muri sistemu",
    login_with_Pass: "injira ukoresheje nimero ya telefoni n'ijambobanga",
    phoneNumber: "Nimero ya telefoni",
    password: "ijambobanga",
    pass: "ijambo....",
    createAccount: "fungura konti yawe",
    EnterFirstName: "andika izina ry'umuryango",
    EnterPhone: "shyiramo nimero ya telefoni yawe",
    EnterEmail: "shyiramo imeyili yawe niba uyifite",
    createPass: "hanga ijambobanga",
    accountCreated: "gufungura konti byagenze neza!",
    fillInfo: "uzuza ibikuranga, ufungure konti",
    nationality: "shyiramo igihugu ukomokamo",
    register: "fungura konti",
    lognSuccess: "muhawe ikaze !",
    joinRecycling:
      "injiro muri gahunda yo kuvugura ibyakoreshejwe by'umwahariko amacupa ya parasitiki utangire kuzajya uhemberwa buri cupa washyize mu mashini yagenewe gushyirwamo ibyakoreshejwe",
    selectMachine: "hitamo mashine ukurikije aho uherereye",
    location: "Aho uri kubarizwa",
    zone: "Agace urimo",
    selectLocation: "hitamo aho uherereye",
    selectZone: "hitamo agace urimo",
    next: "ibikurikira",
    selectbottletype: "hitamo ubwo bw'icupa",
    getReverse:
      "Egera imashini yagenewe gushyirwamo amacupa yakoreshejwe nawe ushyirmo ayo ufite niba ufite aya plasitiki cyangwa ama kaneti",
    mystats: "ibijyanye nuruhare nagize",
    totalReword: "igiteranyo cy'ibihembo",
    withdraw: "bikuza",
    date: "Igihe",
    Contribution: "Ibyakozwe",
    Reward: "Igihembo",
    getMachineScan:
      "niba wamaze gushyiramo amacupa yawe koresha telefoni yawe usikane ibimenyetso by'ibara ry'umukara bije kuri machine",
    scanQr: "sikana ibimenyetso",
    Redeem: "reba igihembo",
    paymentinfo: "AMAKURU AJYANYE NO GUHEMBWA",
    currentBalance: "amafaranga ari kuri konti",
    whereDoYouWantCash: "nihehe mushaka kwakirira amafaranga ?",
    transfer: "ohereza",
    enterMoney: "Shyiramo umubare w'amafaranga",
  },
};
export const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;
export default translations;