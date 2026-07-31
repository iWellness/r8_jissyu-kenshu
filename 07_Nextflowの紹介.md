# Nextflowの紹介

今回の実習では行いませんが、、、
以下のコマンドで結果まで計算することができます。

```bash
nextflow run nf-core/ampliseq \
    -profile docker \
    --input_folder "subsampling" \
    --FW_primer "CCTACGGGNGGCWGCAG" \
    --RV_primer "GACTACHVGGGTATCTAATCC" \
    --classifier "silva-138-99-nb-classifier.qza" \
    --dada_ref_taxonomy silva \
    --skip_dada_addspecies \
    --dada_ref_tax_custom silva_nr99_v138.1_wSpecies_train_set.fa.gz \
    --trunclenf 267 --trunclenr 267 \
    --outdir "./outputs"
```
