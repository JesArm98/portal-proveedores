import CustomDialog from "./CustomDialog";

const PreviewDialog = ({ open, onClose, previewData }) => {
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Previsualizar archivo"
      width="xl"
      onPdfPreview={true}
      paddingContent={0}
    >
      {previewData?.type.includes("pdf") ? (
        <iframe
          src={`data:application/pdf;base64,${previewData?.archivoB64}`}
          width="100%"
          height="700px"
          title={previewData?.nombreDoc}
        />
      ) : (
        <img
          src={`data:image/jpeg;base64,${previewData?.archivoB64}`}
          alt={previewData?.nombreDoc}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      )}
    </CustomDialog>
  );
};

export default PreviewDialog;
