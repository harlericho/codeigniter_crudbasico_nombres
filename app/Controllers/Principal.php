<?php

namespace App\Controllers;

use App\Models\Principal_model;

// *  para poder saber si viene un url ajax en el controlador
define('IS_AJAX', isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');
class Principal extends BaseController
{
	public function index()
	{
		return view('crud/principal');
	}
	// TODO: listado de los datos
	public function list()
	{
		if (IS_AJAX) {
			$model = new Principal_model();
			return json_encode($model->getData());
		}
	}
	// TODO: guardar los datos
	public function save()
	{
		if (IS_AJAX) {
			$model = new Principal_model();
			$arrayName = array('nombres' => strtoupper($_POST['nombres']),);
			$names = $model->namesData($arrayName);
			if ($names == true) {
				return json_encode([
					"respuest" => "danger"
				]);
			} else {
				$model->insertData($arrayName);
				return json_encode([
					"respuest" => "success"
				]);
			}
		}
	}
	// TODO: cambiar el estado de los datos
	public function delete()
	{
		//if (IS_AJAX) {
		$model = new Principal_model();
		$arrayName = array(
			'id' => $_POST['idEliminar'],
			'estado' => 'I'
		);
		$status = $model->statusData($arrayName);
		if ($status == true) {
			return json_encode([
				"respuest" => "danger"
			]);
		} else {
			$model->deleteData($arrayName);
			return json_encode([
				"respuest" => "success"
			]);
		}
	}

	// TODO: obtener lod datos por el id
	public function get()
	{
		if (IS_AJAX) {
			$model = new Principal_model();
			$arrayName = array('id' => $_POST['idEditar'],);
			$get = $model->getID($arrayName);
			return json_encode([
				"respuest" => "success",
				"data" => $get
			]);
		}
	}

	// TODO: modificar los datos
	public function update()
	{
		if (IS_AJAX) {
			$model = new Principal_model();
			$arrayName = array(
				'nombres' => strtoupper($_POST['nombres']),
				'id' => $_POST['id']
			);
			$names = $model->namesData($arrayName);
			if ($names == true) {
				return json_encode([
					"respuest" => "danger"
				]);
			} else {
				$model->updateData($arrayName);
				return json_encode([
					"respuest" => "success"
				]);
			}
		}
	}
}