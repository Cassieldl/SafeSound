$(document).ready(function () {

    let table = $('#tabela_html').DataTable({
        destroy: true,
        dom:
            "<'row mb-2'<'col-sm-12 d-flex justify-content-start'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row mt-2 d-flex justify-content-between align-items-center'<'col-sm-6'i><'col-sm-6'p>>",
        lengthChange: false,
        responsive: true,
        processing: true,
        serverSide: true,
        pageLength: 10,

        ajax: {
            url: "pessoas/pessoas_ctl.php?op=list",
            type: "POST",
            dataSrc: "data"
        },

        columns: [
            { data: "id_pessoa", visible: false, orderable: false },
            { data: "nome_pessoa" },
            { data: "sobrenome_pessoa" },
            { data: "cpf_pessoa" },
            { data: "data_nascimento_pessoa" },
            { data: "telefone_pessoa" },
            { data: "endereco_pessoa" },
            { data: "nome_cidade" },
            { data: "data_cadastro_pessoa" },

            {
                data: null,
                orderable: false,
                searchable: false,
                className: "text-center",
                render: function (row) {
                    return `
                        <a href="javascript: abreeditar('${row.id_pessoa}')" 
                           title="Alterar"  
                           class="btn btn-sm btn-primary btn-alterar">
                            <i class="fas fa-edit"></i>
                        </a>

                        <a href="javascript: confirma('${row.id_pessoa}','${row.nome_pessoa}')"
                           title="Excluir"  
                           class="btn btn-sm btn-danger">
                            <i class="far fa-trash-alt"></i>
                        </a>
                    `;
                }
            }
        ],

        columnDefs: [
            { width: "100px", targets: -1 }
        ],

        language: {
            decimal: ",",
            thousands: ".",
            sEmptyTable: "Nenhum dado disponível",
            sInfo: "Mostrando _START_ até _END_ de _TOTAL_ registros",
            sInfoEmpty: "Mostrando 0 até 0 de 0 registros",
            sInfoFiltered: "(filtrado de _MAX_ registros)",
            sLoadingRecords: "Carregando...",
            sProcessing: "Processando...",
            sSearch: "Pesquisar: ",
            sZeroRecords: "Nenhum registro encontrado",
            oPaginate: {
                sFirst: "Primeiro",
                sLast: "Último",
                sNext: "Próximo",
                sPrevious: "Anterior"
            }
        }
    });

    // 🔍 pesquisa customizada
    $("#search-input").on("keyup", function () {
        table.search($(this).val()).draw();
    });

    // 🖱️ duplo clique para editar
    $("#tabela_html").on("dblclick", "tr", function () {
        $(this).find("a.btn-alterar")[0].click();
    });

});
