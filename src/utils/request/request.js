import axios from "axios";

const access_token = localStorage.getItem("access_token");

export const instance = axios.create({
  baseURL: "https://constructionproject.crud.uz/",
  headers: {
    Authorization: `Bearer ${access_token}`,
    Accept: "*/*",
  },
});

export const file = axios.create({
  baseURL: "https://constructionproject.crud.uz/",
  headers: {
    Authorization: `Bearer ${access_token}`,
    Accept: "*/*",
    "Content-Type": "multipart/form-data",
  },
});

// login

export function login(data) {
  return instance.post("token", data);
}

// user

export function user_get(page, limit, search, role) {
  if (search && !role) {
    return instance.get(
      `get_users?search=${search}&page=${page}&limit=${limit}`
    );
  } else if (role && !search) {
    return instance.get(`get_users?role=${role}&page=${page}&limit=${limit}`);
  } else if (search && role) {
    return instance.get(
      `get_users?search=${search}&role=${role}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(`get_users?page=${page}&limit=${limit}`);
  }
}

export function current_user() {
  return instance.get("get_user");
}

export function user_add(data) {
  return instance.post("create_user", data);
}

export function user_put(data) {
  return instance.put("update_user/" + data.id, data);
}

// building

export function building_get(page, limit, search, status) {
  if (search && !status) {
    return instance.get(
      `get_buildings?search=${search}&page=${page}&limit=${limit}`
    );
  } else if (status && !search) {
    return instance.get(
      `get_buildings?status=${status}&page=${page}&limit=${limit}`
    );
  } else if (search && status) {
    return instance.get(
      `get_buildings?search=${search}&status=${status}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(`get_buildings?page=${page}&limit=${limit}`);
  }
}

export function building_add(data) {
  return instance.post("create_building", data);
}

export function building_put(data) {
  return instance.put("update_building/" + data.id, data);
}

// smeta

export function smeta_get(page, limit, search, status, id) {
  if (search && !status) {
    return instance.get(
      `get_smeta/${id}?search=${search}&page=${page}&limit=${limit}`
    );
  } else if (status && !search) {
    return instance.get(
      `get_smeta/${id}?status=${status}&page=${page}&limit=${limit}`
    );
  } else if (search && status) {
    return instance.get(
      `get_smeta/${id}?search=${search}&status=${status}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(`get_smeta/${id}?&page=${page}&limit=${limit}`);
  }
}

export function smeta_request_get(page, limit, search, status, id, user_id) {
  if (search && !status) {
    return instance.get(
      `get_smeta_for_supply/?building_id=${id}&user_id=${user_id}&search=${search}&page=${page}&limit=${limit}`
    );
  } else if (status && !search) {
    return instance.get(
      `get_smeta_for_supply/?building_id=${id}&user_id=${user_id}&status=${status}&page=${page}&limit=${limit}`
    );
  } else if (search && status) {
    return instance.get(
      `get_smeta_for_supply/?building_id=${id}&user_id=${user_id}&search=${search}&status=${status}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(
      `get_smeta_for_supply/?building_id=${id}&user_id=${user_id}&&page=${page}&limit=${limit}`
    );
  }
}

export function accept_smeta_request(data) {
  return instance.put(`attach_to_user/${data.smeta_id}/${data.taminotchi_id}`);
}

export function remove_smeta_request(id) {
  return instance.delete(`remove_attached_product/${id}`);
}

export function smeta_add(data, id) {
  return file.post("create_smeta/" + id, data);
}

export function smeta_remove(id, status) {
  if (status !== "smeta_id") {
    return instance.delete(`remove_smeta?building_id=${id}`);
  } else {
    return instance.delete(`remove_smeta?smeta_id=${id}`);
  }
}

export function take_supply_smeta(data) {
  if (data[0].type == "smeta") {
    return instance.post(`take_supply_by_b_a`, data);
  } else {
    return instance.post(`take_supply_smeta`, data);
  }
}

// products

export function products_get(page, limit, search) {
  if (search) {
    return instance.get(
      `get_products?search=${search}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(`get_products?page=${page}&limit=${limit}`);
  }
}

// foremans

export function foreman_get(id) {
  return instance.get("get_foremans/" + id);
}

export function foreman_add(data) {
  return instance.post("create_foreman", data);
}

export function foreman_remove(id) {
  return instance.delete("remove_foreman/" + id);
}

// warehousemans

export function warehouseman_get(id) {
  return instance.get("get_warehousemans/" + id);
}

export function warehouseman_add(data) {
  return instance.post("create_warehouseman", data);
}

export function warehouseman_remove(id) {
  return instance.delete("remove_warehouseman/" + id);
}

// product composition

export function product_composition_get(id) {
  return instance.get("get_product_composition/" + id);
}

export function product_composition_add(data) {
  return instance.post("create_product_composition", data);
}

export function take_product_request(data) {
  if (data.type == "tarkib") {
    return instance.post("take_supply_by_b_a", Array(data));
  } else {
    return instance.post("take_supply_product_composition", data);
  }
}

export function product_composition_remove(id) {
  return instance.delete("remove_product_composition/" + id);
}

// bank accounts

export function bank_account_get(page, limit, search) {
  if (search) {
    return instance.get(
      `get_bank_accounts?search=${search}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(`get_bank_accounts?page=${page}&limit=${limit}`);
  }
}

export function bank_account_add(data) {
  return instance.post("create_bank_account", data);
}

export function bank_account_put(id, data) {
  return instance.put("update_bank_account/" + id, data);
}

// transfers

export function transfers(data) {
  return instance.post("acceptance_money_to_bank_account", data);
}

export function transfer_to_cashiers(data) {
  return instance.post("transfer_money_to_cashier", data);
}

export function transfer_history_get(
  page,
  limit,
  from,
  to,
  type,
  from_time,
  to_time
) {
  if (from_time && to_time) {
    return instance.get(
      `money_transfered_to_bank_accounts?from_time=${from_time}&to_time=${to_time}&from_=${from}&to_=${to}&type=${type}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(
      `money_transfered_to_bank_accounts?from_=${from}&to_=${to}&type=${type}&page=${page}&limit=${limit}`
    );
  }
}

export function transfer_cashier_get(
  page,
  limit,
  from,
  to,
  status,
  from_time,
  to_time
) {
  if (from_time && to_time) {
    return instance.get(
      `money_to_cashier?from_time=${from_time}&to_time=${to_time}&from_=${from}&to_=${to}&status=${status}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(
      `money_to_cashier?from_=${from}&to_=${to}&status=${status}&page=${page}&limit=${limit}`
    );
  }
}

export function transfer_users_get(
  page,
  limit,
  from,
  to,
  status,
  from_time,
  to_time
) {
  if (from_time && to_time) {
    return instance.get(
      `transfered_money_to_users_from_cashier?from_time=${from_time}&to_time=${to_time}&from_=${from}&to_=${to}&status=${status}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(
      `transfered_money_to_users_from_cashier?from_=${from}&to_=${to}&status=${status}&page=${page}&limit=${limit}`
    );
  }
}

export function transfer_m_cashiers_get(
  page,
  limit,
  from,
  to,
  status,
  from_time,
  to_time
) {
  if (from_time && to_time) {
    return instance.get(
      `transfered_money_to_cashier_from_users?from_time=${from_time}&to_time=${to_time}&from_=${from}&to_=${to}&status=${status}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(
      `transfered_money_to_cashier_from_users?from_=${from}&to_=${to}&status=${status}&page=${page}&limit=${limit}`
    );
  }
}

export function accept_money_in_cashier(id, money_l_id, percent, comment) {
  return instance.put(
    `acceptance_or_remove_transfered_money/${id}?money_launderer_id=${money_l_id}&percent=${percent}&comment=${comment}`
  );
}

export function take_money_to_launderer(data) {
  return instance.post("take_money_from_money_launderer", data);
}

export function take_money_from_wallets(data) {
  return instance.post("transfer_money_from_wallet", data);
}

export function transfer_money_to_wallets(data) {
  return instance.post("transfer_money_to_wallet", data);
}

export function transfer_money_to_users(data) {
  return instance.post("transfer_money_to_users_from_cashier", data);
}

export function transfer_money_to_cashier(data) {
  return instance.post("transfer_money_to_cashier_from_users", data);
}

export function money_from_launderer_get(
  page,
  limit,
  from,
  from_time,
  to_time
) {
  if (from_time && to_time) {
    return instance.get(
      `money_from_money_launderer?from_time=${from_time}&to_time=${to_time}&from_=${from}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(
      `money_from_money_launderer?from_=${from}&page=${page}&limit=${limit}`
    );
  }
}

export function money_to_launderer_get(page, limit, to, from_time, to_time) {
  if (from_time && to_time) {
    return instance.get(
      `money_to_money_launderer?from_time=${from_time}&to_time=${to_time}&to_=${to}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(
      `money_to_money_launderer?to_=${to}&page=${page}&limit=${limit}`
    );
  }
}

export function transfer_from_w_history_get(
  page,
  limit,
  from,
  from_time,
  to_time
) {
  if (from_time && to_time) {
    return instance.get(
      `transfered_money_from_wallet?from_time=${from_time}&to_time=${to_time}&from_=${from}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(
      `transfered_money_from_wallet?from_=${from}&page=${page}&limit=${limit}`
    );
  }
}

export function transfer_to_w_history_get(page, limit, to, from_time, to_time) {
  if (from_time && to_time) {
    return instance.get(
      `transfered_money_to_wallet?from_time=${from_time}&to_time=${to_time}&to_=${to}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(
      `transfered_money_to_wallet?to_=${to}&page=${page}&limit=${limit}`
    );
  }
}

export function accept_or_remove_m_user(id) {
  return instance.put(
    `acceptance_or_remove_transfered_money_to_cashier_from_users/${id}`
  );
}
export function accept_or_remove_m_cashier(id) {
  return instance.put(
    `acceptance_or_remove_transfered_money_to_users_from_cashier/${id}`
  );
}

// expences

// expence fixed

export function fixed_expence_get(page, limit, search) {
  if (search) {
    return instance.get(
      `fixed_expenses?search=${search}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(`fixed_expenses?page=${page}&limit=${limit}`);
  }
}

export function fixed_expence_add(data) {
  return instance.post(`create_fixed_expense`, data);
}

export function fixed_expence_put(data) {
  return instance.put(`update_fixed_expense/${data.id}`, data);
}

export function get_fixed_history(page, limit, from_, to_, user_id) {
  return instance.get(
    `get_fixed_expenses?to_=${to_}&from_=${from_}&user_id=${user_id}&page=${page}&limit=${limit}`
  );
}

// variable

export function get_variable_history(page, limit, from_, user_id) {
  return instance.get(
    `get_variable_expenses?from_=${from_}&user_id=${user_id}&page=${page}&limit=${limit}`
  );
}

export function pay_for_variable_expense(data) {
  return instance.post(`pay_for_variable_expense`, data);
}

export function pay_for_fixed_expense(data) {
  return instance.post(`pay_for_fixed_expense`, data);
}

// Building documents

export function building_d_get(id) {
  return instance.get(`get_building_documents/${id}`);
}

export function building_d_add(data, id) {
  return file.post(`create_building_document?building_id=${id}`, data);
}

export function building_d_remove(id) {
  return instance.delete(`remove_building_document/${id}`);
}

// main warehouses

export function main_warehouses_get(page, limit, search) {
  if (search) {
    return instance.get(
      `get_main_warehouses?search=${search}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(`get_main_warehouses?page=${page}&limit=${limit}`);
  }
}

export function main_warehouses_add(data) {
  return instance.post(`create_main_warehouse`, data);
}

export function main_warehouses_put(data) {
  return instance.put(`update_main_warehouse/${data.id}`, data);
}

// money launderers

export function money_launderers_get(page, limit, search) {
  if (search) {
    return instance.get(
      `get_money_launderers?search=${search}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(`get_money_launderers?page=${page}&limit=${limit}`);
  }
}

export function money_launderers_add(data) {
  return instance.post(`create_money_launderer`, data);
}

export function money_launderers_put(data) {
  return instance.put(`update_money_launderer/${data.id}`, data);
}

// proche sorovlar

export function proche_s_get(
  page,
  limit,
  building_id,
  status,
  user_id,
  search
) {
  if (status && !search) {
    return instance.get(
      `get_product_request?building_id=${building_id}&status=${status}&user_id=${user_id}&page=${page}&limit=${limit}`
    );
  } else if (search && !status) {
    return instance.get(
      `get_product_request?building_id=${building_id}&search=${search}&user_id=${user_id}&page=${page}&limit=${limit}`
    );
  } else if (search && status) {
    return instance.get(
      `get_product_request?building_id=${building_id}&status=${status}&search=${search}&user_id=${user_id}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(
      `get_product_request?building_id=${building_id}&user_id=${user_id}&page=${page}&limit=${limit}`
    );
  }
}

export function proche_s_add(data) {
  return instance.post(`product_request`, data);
}

export function take_supply_proche(data) {
  if (data.type == "proche") {
    return instance.post(`take_supply_by_b_a`, Array(data));
  } else {
    return instance.post(`take_supply_proche`, data);
  }
}

export function proche_s_put(p_s_id, status, t_id, data) {
  return instance.put(
    `confirm_or_reject_product_request/${p_s_id}?status=${status}&taminotchi_id=${t_id}`,
    data
  );
}

export function accept_supply(data) {
  return instance.put(`supply_acceptance`, data);
}

export function remove_supply_w(id) {
  return instance.put(`supply_return/${id}`);
}

// wallets

export function wallets_get(page, limit, search) {
  if (search) {
    return instance.get(
      `get_wallets?search=${search}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(`get_wallets?page=${page}&limit=${limit}`);
  }
}

export function wallet_add(data) {
  return instance.post(`create_wallet`, data);
}

export function wallet_put(data) {
  return instance.put(`update_wallet/${data.id}`, data);
}

// workers

export function workers_get(page, limit, search, building_id) {
  if (search) {
    return instance.get(
      `get_workers?building_id=${building_id}&search=${search}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(
      `get_workers?building_id=${building_id}&page=${page}&limit=${limit}`
    );
  }
}

export function worker_add(data) {
  return instance.post(`create_worker`, data);
}

export function worker_put(data) {
  return instance.put(`update_worker/${data.id}`, data);
}

// worker specialities

export function worker_speciality_add(data) {
  return instance.post(`create_worker_specialty`, data);
}

export function worker_speciality_remove(id) {
  return instance.delete(`remove_worker_specialty/${id}`);
}

// markets

export function markets_get(page, limit, search) {
  if (search) {
    return instance.get(
      `get_markets?search=${search}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(`get_markets?page=${page}&limit=${limit}`);
  }
}

export function shot_request(
  market_id,
  status,
  paid_status,
  building_id,
  type,
  from_time,
  to_time,
  page,
  limit
) {
  if (from_time && to_time && status && paid_status) {
    return instance.get(
      `get_supplies_by_b_a?market_id=${market_id}&status=${status}&paid_status=${paid_status}&building_id=${building_id}&type=${type}&from_time=${from_time}&to_time=${to_time}&page=${page}&limit=${limit}`
    );
  } else if (from_time && to_time && status && !paid_status) {
    return instance.get(
      `get_supplies_by_b_a?market_id=${market_id}&status=${status}&building_id=${building_id}&type=${type}&from_time=${from_time}&to_time=${to_time}&page=${page}&limit=${limit}`
    );
  } else if (from_time && to_time && !status && paid_status) {
    return instance.get(
      `get_supplies_by_b_a?market_id=${market_id}&paid_status=${paid_status}&building_id=${building_id}&type=${type}&from_time=${from_time}&to_time=${to_time}&page=${page}&limit=${limit}`
    );
  } else if (from_time && to_time && !status && !paid_status) {
    return instance.get(
      `get_supplies_by_b_a?market_id=${market_id}&building_id=${building_id}&type=${type}&from_time=${from_time}&to_time=${to_time}&page=${page}&limit=${limit}`
    );
  } else if (!from_time && !to_time && status && paid_status) {
    return instance.get(
      `get_supplies_by_b_a?market_id=${market_id}&status=${status}&paid_status=${paid_status}&building_id=${building_id}&type=${type}&page=${page}&limit=${limit}`
    );
  } else if (!from_time && !to_time && !status && paid_status) {
    return instance.get(
      `get_supplies_by_b_a?market_id=${market_id}&paid_status=${paid_status}&building_id=${building_id}&type=${type}&page=${page}&limit=${limit}`
    );
  } else if (!from_time && !to_time && status && !paid_status) {
    return instance.get(
      `get_supplies_by_b_a?market_id=${market_id}&status=${status}&building_id=${building_id}&type=${type}&page=${page}&limit=${limit}`
    );
  } else if (!from_time && !to_time && !status && !paid_status) {
    return instance.get(
      `get_supplies_by_b_a?market_id=${market_id}&building_id=${building_id}&type=${type}&page=${page}&limit=${limit}`
    );
  }
}

export function get_supplies(
  market_id,
  status,
  paid_status,
  building_id,
  type,
  from_time,
  to_time,
  page,
  limit
) {
  if (from_time && to_time && status && paid_status) {
    return instance.get(
      `get_supplies?market_id=${market_id}&status=${status}&paid_status=${paid_status}&building_id=${building_id}&type=${type}&from_time=${from_time}&to_time=${to_time}&page=${page}&limit=${limit}`
    );
  } else if (from_time && to_time && status && !paid_status) {
    return instance.get(
      `get_supplies?market_id=${market_id}&status=${status}&building_id=${building_id}&type=${type}&from_time=${from_time}&to_time=${to_time}&page=${page}&limit=${limit}`
    );
  } else if (from_time && to_time && !status && paid_status) {
    return instance.get(
      `get_supplies?market_id=${market_id}&paid_status=${paid_status}&building_id=${building_id}&type=${type}&from_time=${from_time}&to_time=${to_time}&page=${page}&limit=${limit}`
    );
  } else if (from_time && to_time && !status && !paid_status) {
    return instance.get(
      `get_supplies?market_id=${market_id}&building_id=${building_id}&type=${type}&from_time=${from_time}&to_time=${to_time}&page=${page}&limit=${limit}`
    );
  } else if (!from_time && !to_time && status && paid_status) {
    return instance.get(
      `get_supplies?market_id=${market_id}&status=${status}&paid_status=${paid_status}&building_id=${building_id}&type=${type}&page=${page}&limit=${limit}`
    );
  } else if (!from_time && !to_time && !status && paid_status) {
    return instance.get(
      `get_supplies?market_id=${market_id}&paid_status=${paid_status}&building_id=${building_id}&type=${type}&page=${page}&limit=${limit}`
    );
  } else if (!from_time && !to_time && status && !paid_status) {
    return instance.get(
      `get_supplies?market_id=${market_id}&status=${status}&building_id=${building_id}&type=${type}&page=${page}&limit=${limit}`
    );
  } else if (!from_time && !to_time && !status && !paid_status) {
    return instance.get(
      `get_supplies?market_id=${market_id}&building_id=${building_id}&type=${type}&page=${page}&limit=${limit}`
    );
  }
}

export function pay_for_supply(data) {
  return instance.post(`pay_for_supply`, data);
}

export function pay_for_supply_by_b_a(data) {
  return instance.post(`pay_for_supply_by_b_a`, data);
}

export function remove_supply(id) {
  return instance.delete(`remove_supply/${id}`);
}

export function remove_supply_by_b_a(id) {
  return instance.delete(`remove_supply_by_b_a/${id}`);
}

export function take_supply_b_a(data) {
  if (data.type == "smeta") {
    data.type = "shot_smeta";
    return instance.post(`take_supply_smeta`, Array(data));
  } else if (data.type == "proche") {
    data.type = "shot_proche";
    return instance.post(`take_supply_proche`, data);
  } else if (data.type == "tarkib") {
    data.type = "shot_tarkib";
    return instance.post(`take_supply_product_composition`, data);
  }
}

export function market_put(data) {
  return instance.put(`update_market/${data.id}`, data);
}

// worker types

export function worker_type_get(page, limit, search) {
  if (search) {
    return instance.get(
      `get_worker_specialty_types?search=${search}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(
      `get_worker_specialty_types?page=${page}&limit=${limit}`
    );
  }
}

export function worker_type_add(data) {
  return instance.post(`create_worker_specialty_type`, data);
}

export function worker_type_remove(id) {
  return instance.delete(`remove_worker_specialty_type/${id}`);
}
