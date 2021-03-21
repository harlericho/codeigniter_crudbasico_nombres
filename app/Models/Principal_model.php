<?php

namespace App\Models;

use CodeIgniter\Model;

class Principal_model extends Model
{
    public function getData()
    {
        $query = $this->db->query("call procedure_listado");
        return $query->getResult();
    }
    public function insertData($data)
    {
        $query = $this->db->table("datos");
        return $query->insert($data);
    }
    public function deleteData($data)
    {
        $query = $this->db->table("datos");
        $query->set($data);
        $query->where("id", $data["id"]);
        return $query->update();
    }
    public function statusData($data)
    {
        $query = $this->db->table("datos");
        $query->select("*");
        $query->where("id", $data['id']);
        $query->where("estado", $data['estado']);
        $value = $query->get()->getResult();
        if (sizeof($value) >= 1) {
            return true;
        } else {
            return false;
        }
    }
    public function namesData($data)
    {
        $query = $this->db->table("datos");
        $query->select("*");
        $query->like("nombres", $data['nombres'], "after");
        $value = $query->get()->getResult();
        if (sizeof($value) >= 1) {
            return true;
        } else {
            return false;
        }
    }
    public function getID($data)
    {
        $query = $this->db->table("datos");
        $query->where("id", $data['id']);
        return $query->get()->getRow();
    }
    public function updateData($data)
    {
        $query = $this->db->table("datos");
        $query->set($data);
        $query->where("id", $data['id']);
        return $query->update();
    }
}