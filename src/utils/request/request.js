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

export function transfer_history_get(page, limit, from, to, type) {
  if (to) {
    return instance.get(
      `money_transfered_to_bank_accounts?from_=${from}&to_=${to}&type=${type}&page=${page}&limit=${limit}`
    );
  } else {
    return instance.get(
      `money_transfered_to_bank_accounts?from_=${from}&type=${type}&page=${page}&limit=${limit}`
    );
  }
}
