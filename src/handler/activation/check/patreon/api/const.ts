export const patreonSearchParams = new URLSearchParams();
patreonSearchParams.append('include', 'user,currently_entitled_tiers');
// This determines what data to return,
// therefore the keys requested here must match the type of `PatreonMember.attributes`
patreonSearchParams.append('fields[member]', 'email,last_charge_date,last_charge_status,patron_status,pledge_cadence');
// This determines what data to return,
// therefore the keys requested here must match the type of `PatreonUser.attributes`
patreonSearchParams.append('fields[user]', 'social_connections');
